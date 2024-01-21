import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Subject } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  notificationEvents: Record<string, Subject<any>> = {};

  async create({ value, concepto }: CreatePaymentDto, user: any) {
    const { address } = await this.prisma.address.findFirst({
      where: {
        isAvailable: true,
      },
      select: {
        address: true,
      },
    });

    await this.prisma.address.update({
      where: {
        address,
      },
      data: {
        payments: {
          create: {
            concepto,
            value: value.toString(),
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
        isAvailable: false,
      },
    });

    return;
  }
  
  async findOne(id: string) {
    let transacions = await this.prisma.payments.findUnique({
      where: {
        id,
      },
      select: {
        address: {
          select: {
            address: true,
          },
        },
        value: true,
        concepto: true,
        status: true,
      },
    });

    if (!transacions) {
      throw new NotFoundException();
    }

    return {
      ...transacions,
      address: transacions.address.address,
    };
  }

  async handleConnection(id: string) {
    if (!this.notificationEvents[id]) {
      this.notificationEvents[id] = new Subject();
    }

    let transacions = await this.prisma.transacions.findUnique({
      where: {
        transacionshash: id,
      },
      select: {
        isProcessed: true,
      },
    });

    if (!transacions) {
      this.notificationEvents[id].complete();
      return this.notificationEvents[id].asObservable();
    }

    if (transacions.isProcessed) {
      this.notificationEvents[id].complete();
      return this.notificationEvents[id].asObservable();
    }

    setInterval(async () => {
      let transacions = await this.prisma.transacions.findUnique({
        where: {
          transacionshash: id,
        },
        select: {
          isProcessed: true,
        },
      });

      if (transacions.isProcessed) {
        this.notificationEvents[id].next({
          data: { message: transacions.isProcessed },
        });
        this.notificationEvents[id].complete();
      } else {
        this.notificationEvents[id].next({
          data: { message: transacions.isProcessed },
        });
      }
    }, 3000);

    return this.notificationEvents[id].asObservable();
  }
}
