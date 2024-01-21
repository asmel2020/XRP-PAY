import { Module } from '@nestjs/common';
import { EventsService } from './events.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [EventsService],
  imports: [PrismaModule],
  exports:[EventsService]
})
export class EventsModule {}
