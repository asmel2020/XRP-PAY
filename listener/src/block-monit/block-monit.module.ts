import { Module } from '@nestjs/common';
import { BlockMonitService } from './block-monit.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  providers: [BlockMonitService],
  imports:[PrismaModule, EventsModule]
})
export class BlockMonitModule {}
