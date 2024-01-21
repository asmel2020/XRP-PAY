import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { JsonRpcProvider, ethers } from 'ethers';
import { rangeNumber } from '../common/utils/rangeNumber';
import { delay } from '../common/utils/delay';

import { getMaxNumFromArray } from '../common/utils/getMaxNumFromArray';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class BlockMonitService {
  private provider: JsonRpcProvider;
  private BLOCK_NUMBER_START = 4;

  take = 10;

  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private  eventsService :EventsService
  ) {}

  async onBlock(provider: string) {
    this.provider = new JsonRpcProvider(provider);
    let chainId = ethers.toBeHex((await this.provider.getNetwork()).chainId);

    const lastBlockNumber = await this.prisma.lastBlockNumber.findUnique({
      where: {
        chainId: chainId,
      },
      select: {
        blockNumber: true,
      },
    });

    this.provider.on('error', async (error: any) => {
      console.log('error loco');
      throw new Error(error);
    });

    let start = true;

    //borrar todos los bloques
    await this.prisma.blockNumber.deleteMany({
      where: { chainId: chainId },
    });

    this.provider.on('block', async (block: number) => {
      
      let blockNumber = block - this.BLOCK_NUMBER_START;

      if (start && blockNumber) {
        start = false;

        if (!lastBlockNumber) {
          await this.lastBlockNumber(chainId, blockNumber, blockNumber + 1);
        } else {
          await this.lastBlockNumber(
            chainId,
            blockNumber,
            lastBlockNumber.blockNumber,
          );
        }
        await this.processBlocks(chainId);
      }

      await this.prisma.blockNumber.create({
        data: {
          blockNumber,
          chainId: chainId,
        },
      });
    });
  }

  async lastBlockNumber(
    chainId: string,
    newBlockNumber: number,
    lastBlockNumber: number,
  ) {
    const currentBlock = newBlockNumber;
    const range = rangeNumber(lastBlockNumber, currentBlock - 1);

    let data: { blockNumber: number; chainId: string }[] = [];

    range.forEach(async (blockNumber) => {
      data.push({
        blockNumber,
        chainId: chainId,
      });
    });
ethers.TransactionResponse
    await this.prisma.blockNumber.createMany({ data, skipDuplicates: true });
  }

  private async processBlocks(chainId: string) {
    while (true) {
      let block: { blockNumber: number }[];
      await delay(2000);
      try {
        block = await this.prisma.blockNumber.findMany({
          where: {
            chainId,
          },
          select: {
            blockNumber: true,
          },
          orderBy: {
            blockNumber: 'asc',
          },
          take: this.take,
        });
      } catch (error) {
        continue;
      }

      if (block.length === 0) {
        this.take = 10;
        await delay(8000);
        continue;
      }

      const BlockNumber = block.map((b) => b.blockNumber);
      // prettier-ignore

      let fulfilled:any[]
      let logs: any[];
      let rejected: any[];

      // consulta los bloques de transciones
      do {

        logs = [];
        BlockNumber.forEach((blockNumber) => logs.push(this.provider.getBlock(blockNumber,true)));

        const allSettled = await Promise.allSettled(logs);

        fulfilled = [];
        rejected = [];
    
        allSettled.forEach((settled) => {
          if (settled.status === 'fulfilled') {
            fulfilled.push(settled.value.prefetchedTransactions);
            return;
          }
          rejected.push(settled.reason);
        });

        if (rejected.length > 0) {
          console.log('error block consulter');
          await delay(2000);
        }

      } while (rejected.length > 0);

      let blocks: { [key: number]: ethers.TransactionResponse[] } = {};
      

      //organizar datos por bloques
      fulfilled.forEach((log) => {
        log.forEach((log) => {
          if(log.value <= ethers.toBigInt(0)){
            return
          }
          if (!blocks[log.blockNumber]) {
            blocks[log.blockNumber] = [];
          }

          blocks[log.blockNumber].push(log);
        });
      });

      
      for (let key in blocks) {
        if (blocks[key].length === 0) continue;
        await this.sendData(blocks[key], key, chainId);
      }

      let condition = false;

      do {
        try {
          await this.prisma.blockNumber.deleteMany({
            where: {
              blockNumber: {
                in: BlockNumber,
              },
              chainId,
            },
          });
          condition = false;
        } catch (error) {
          condition = true;
          console.log('error delete many');
          await delay(2000);
        }
      } while (condition);

      await this.prisma.lastBlockNumber.upsert({
        where: {
          chainId: chainId,
        },
        update: {
          blockNumber: getMaxNumFromArray(BlockNumber),
        },
        create: {
          blockNumber: getMaxNumFromArray(BlockNumber),
          chainId: chainId,
          typeLastBlockNumber: 'MONITOR',
        },
      });
    }
  }

  private async sendData(data: ethers.TransactionResponse[], blockNumber: string, chainId: string) {
   
    this.eventEmitter.emit('transactions', {
      transactions: data,
      blockNumber,
      chainId,
    });
  

  }
}
