import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [EventsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
