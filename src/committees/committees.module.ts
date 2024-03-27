import { Module } from '@nestjs/common';
import { CommitteesService } from './committees.service';
import { CommitteesController } from './committees.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CommitteesController],
  providers: [CommitteesService, PrismaService],
})
export class CommitteesModule {}
