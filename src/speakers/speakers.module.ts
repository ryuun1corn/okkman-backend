import { Module } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { SpeakersController } from './speakers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpeakersController],
  providers: [SpeakersService, PrismaService],
  exports: [SpeakersService],
})
export class SpeakersModule {}
