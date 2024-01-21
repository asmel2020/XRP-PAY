import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  providers: [CronService],
  imports:[PrismaModule,HttpModule]
})
export class CronModule {}
