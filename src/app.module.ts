import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { CommitteesModule } from './committees/committees.module';
import { MenteesModule } from './mentees/mentees.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { SpeakersModule } from './speakers/speakers.module';

@Module({
  imports: [
    EventsModule,
    GroupsModule,
    CommitteesModule,
    MenteesModule,
    SponsorsModule,
    SpeakersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
