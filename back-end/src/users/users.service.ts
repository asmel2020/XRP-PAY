import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WithdrawalUserDto } from './dto/withdrawal-user.dto';
import { JsonRpcProvider, ethers } from 'ethers';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async find(id: string) {
    const [completaCount, activatedCount, cancelledCount, user] =
      await this.prisma.$transaction([
        this.prisma.payments.count({
          where: {
            status: 'COMPLETE',
          },
        }),

        this.prisma.payments.count({
          where: {
            status: 'ACTIVATED',
          },
        }),

        this.prisma.payments.count({
          where: {
            status: 'CANCELLED',
          },
        }),
        this.prisma.user.findUnique({
          where: {
            id,
          },
          select: {
            amount: true,
            payments: {
              select: {
                id: true,
                value: true,
                status: true,
                concepto: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 100,
            },
          },
        }),
      ]);

    return {
      ...user,
      paymentsCount: {
        completaCount,
        activatedCount,
        cancelledCount,
      },
    };
  }

  async withdrawal({ address, value }: WithdrawalUserDto, id: string) {
    const { iswithdrawal } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        iswithdrawal: true,
      },
    });

    if (iswithdrawal === false) {
      throw new NotFoundException('is already making a withdrawal');
    }

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        iswithdrawal: false,
      },
    });

    if (ethers.toBigInt(user.amount) === ethers.toBigInt(0)) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          iswithdrawal: true,
        },
      });
      throw new NotFoundException('does not have enough funds');
    }

    if (ethers.toBigInt(value) > ethers.toBigInt(user.amount)) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          iswithdrawal: true,
        },
      });
      throw new NotFoundException('does not have enough funds');
    }
    let provider = new JsonRpcProvider(this.configService.get('web3.provider'));

    let wallet = new ethers.Wallet(
      this.configService.get('web3.privateKey'),
      provider,
    );
    let transaction: ethers.TransactionResponse;
    try {
      let valueBigInt = ethers.toBigInt(value);

      let porcent =
        (valueBigInt * ethers.toBigInt(50)) / ethers.toBigInt(10000);

      let newValueWithdrawal = valueBigInt - porcent;

      transaction = await wallet.sendTransaction({
        to: address,
        value: newValueWithdrawal,
      });

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          iswithdrawal: true,
          amount: (ethers.toBigInt(user.amount) - valueBigInt).toString(),
        },
      });

      return await transaction.wait(1);
    } catch (error) {
    
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          iswithdrawal: true,
        },
      });

      throw new NotFoundException('transaction error');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
