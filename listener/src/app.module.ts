import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { BlockMonitModule } from './block-monit/block-monit.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    BlockMonitModule,
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    CronModule,
  ],
})
export class AppModule {}
