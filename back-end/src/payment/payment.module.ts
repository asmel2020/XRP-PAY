import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports:[PrismaModule,AuthModule]
})
export class PaymentModule {}
