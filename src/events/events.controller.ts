import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { SponsorsService } from 'src/sponsors/sponsors.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SpeakersService } from 'src/speakers/speakers.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly sponsorsService: SponsorsService,
    private readonly speakersService: SpeakersService,
  ) {}

  @Post() // Done
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get() // Done
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id') // Done
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id') // Done
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Put(':eventId/sponsors/:sponsorId')
  async connectSponsor(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('sponsorId', ParseIntPipe) sponsorId: number,
  ) {
    return this.sponsorsService.connectEvent(eventId, sponsorId);
  }

  @Put(':eventId/speakers/:speakerId')
  async connectSpeaker(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('speakerId', ParseIntPipe) speakerId: number,
  ) {
    return this.speakersService.connectEvent(eventId, speakerId);
  }

  @Delete(':id') // Done
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }

  @Delete(':eventId/sponsors/:sponsorId')
  async removeSponsor(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('sponsorId', ParseIntPipe) sponsorId: number,
  ) {
    return this.sponsorsService.removeEvent(eventId, sponsorId);
  }

  @Delete(':eventId/speakers/:speakerId')
  async removeSpeaker(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('speakerId', ParseIntPipe) speakerId: number,
  ) {
    return this.speakersService.removeEvent(eventId, speakerId);
  }
}
