import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SponsorsController],
  providers: [SponsorsService, PrismaService],
})
export class SponsorsModule {}
