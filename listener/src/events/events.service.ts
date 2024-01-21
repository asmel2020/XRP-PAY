import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { transactionsParams } from './interfaces';
import * as crypto from 'crypto-js';
@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent('transactions')
  async transactions({
    blockNumber,
    chainId,
    transactions,
  }: transactionsParams) {
    const toAddress = transactions.map(({ to }) => to);

    const address = await this.prisma.address.findMany({
      where: {
        address: {
          in: toAddress,
        },
      },
      select: {
        address: true,
      },
    });

    if (address.length >= 1) {
      let aw = address.map(({ address }) => address);

      const toAddress = transactions.filter(({ to }) => aw.includes(to));

      const data = toAddress.map(({ from, to, hash, blockNumber, value }) => {
        return {
          from,
          to,
          hash,
          value: value.toString(),
          blockNumber,
          transacionshash: crypto
            .SHA256(hash + blockNumber.toString() + value.toString())
            .toString(),
        };
      });

      await this.prisma.transacions.createMany({
        data: data,
        skipDuplicates: true,
      });
    }
  }
}
