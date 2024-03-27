import { Module } from '@nestjs/common';
import { CommitteesService } from './committees.service';
import { CommitteesController } from './committees.controller';

@Module({
  controllers: [CommitteesController],
  providers: [CommitteesService],
})
export class CommitteesModule {}
