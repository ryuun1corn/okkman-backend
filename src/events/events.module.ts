import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/prisma.service';
import { SpeakersModule } from 'src/speakers/speakers.module';
import { SponsorsModule } from 'src/sponsors/sponsors.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
  imports: [SpeakersModule, SponsorsModule],
})
export class EventsModule {}
