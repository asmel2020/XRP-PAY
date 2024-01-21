import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { JsonRpcProvider, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private provider = new JsonRpcProvider(
    this.configService.get('web3.provider'),
  );

  private feeTrascion = ethers.toBigInt(63000000254000);

  private wallet = ethers.Wallet.fromPhrase(
    this.configService.get('web3.phraseHdWallet'),
    this.provider,
  );

  @Interval(15_000)
  async firstNotification() {
    let provider = new JsonRpcProvider(this.configService.get('web3.provider'));
    const blockNumber = await provider.getBlockNumber();
    await this.prisma.transacions.updateMany({
      where: {
        blockNumber: {
          lte: blockNumber + 5,
        },
        AND: {
          isConfirmed: false,
        },
      },
      data: {
        isConfirmed: true,
      },
    });
  }

  @Interval(10_000)
  async secondNotification() {
    const transacions = await this.prisma.transacions.findMany({
      where: {
        isConfirmed: true,
        isProcessed: false,
      },
      select: {
        to: true,
        value: true,
        id: true,
      },
      take: 20,
    });

    for (let index = 0; index < transacions.length; index++) {
      const { to, value, id } = transacions[index];

      const payments = await this.prisma.payments.findFirst({
        where: {
          address: {
            address: to,
          },
          status: 'ACTIVATED',
          value,
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              amount: true,
            },
          },
        },
      });

      if (!payments) {
        console.log(payments);
        continue;
      }

      const newAmount =
        ethers.toBigInt(payments.user.amount) + ethers.toBigInt(value);

      await this.prisma.$transaction([
        this.prisma.payments.update({
          where: {
            id: payments.id,
          },
          data: {
            status: 'COMPLETE',
            user: {
              update: {
                amount: newAmount.toString(),
              },
            },
            address: {
              update: {
                isAvailable: true,
              },
            },
            transacions: {
              connect: {
                id: id,
              },
              update: {
                isProcessed: true,
                isConfirmed: true,
              },
            },
          },
        }),
      ]);
    }
  }

  @Interval(10_000)
  async harvest() {
    const transacions = await this.prisma.transacions.findMany({
      where: {
        isConfirmed: true,
        isProcessed: true,
        isHarvest: false,
      },
      select: {
        to: true,
        value: true,
        id: true,
        payments: {
          select: {
            address: {
              select: {
                address: true,
                path: true,
              },
            },
          },
        },
      },
      take: 20,
    });

    for (let index = 0; index < transacions.length; index++) {
      const { payments, id } = transacions[index];

      await this.prisma.transacions.update({
        where: {
          id,
        },
        data: {
          isHarvest: true,
        },
      });

      let balance =
        (await this.provider.getBalance(payments.address.address)) -
        this.feeTrascion;

      if (balance <= ethers.toBigInt(0)) {
        continue;
      }

      let HDWallet = ethers.HDNodeWallet.fromMnemonic(
        this.wallet.mnemonic,
        payments.address.path,
      ).connect(this.provider);

      let transaction: ethers.TransactionResponse;

      try {
        transaction = await HDWallet.sendTransaction({
          to: this.configService.get("web3.masterAddress"),
          value: balance,
        });
      } catch (error) {
        await this.prisma.transacions.update({
          where: {
            id,
          },
          data: {
            isHarvest: false,
          },
        });
        continue;
      }
    }
  }
}
