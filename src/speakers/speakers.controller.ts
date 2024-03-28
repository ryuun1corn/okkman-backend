import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @Post()
  async create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakersService.create(createSpeakerDto);
  }

  @Get()
  async findAll() {
    return this.speakersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpeakerDto: UpdateSpeakerDto,
  ) {
    return this.speakersService.update(id, updateSpeakerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.remove(id);
  }
}
