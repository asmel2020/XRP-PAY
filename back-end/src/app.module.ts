import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';

import { PaymentModule } from './payment/payment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configuration],
  }),PrismaModule, PaymentModule, EventEmitterModule.forRoot(), UsersModule]
  
})
export class AppModule {}
