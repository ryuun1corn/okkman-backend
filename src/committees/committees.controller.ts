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
import { CommitteesService } from './committees.service';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';

@Controller('committees')
export class CommitteesController {
  constructor(private readonly committeesService: CommitteesService) {}

  @Post()
  async create(@Body() createCommitteeDto: CreateCommitteeDto) {
    return this.committeesService.create(createCommitteeDto);
  }

  @Get()
  async findAll() {
    return this.committeesService.findAll();
  }

  @Get('mentors')
  async findAllMentors() {
    return this.committeesService.findAllMentors();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.committeesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommitteeDto: UpdateCommitteeDto,
  ) {
    return this.committeesService.update(id, updateCommitteeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.committeesService.remove(id);
  }
}
