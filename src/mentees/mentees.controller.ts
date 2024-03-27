import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenteesService } from './mentees.service';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { UpdateMenteeDto } from './dto/update-mentee.dto';

@Controller('mentees')
export class MenteesController {
  constructor(private readonly menteesService: MenteesService) {}

  @Post()
  create(@Body() createMenteeDto: CreateMenteeDto) {
    return this.menteesService.create(createMenteeDto);
  }

  @Get()
  findAll() {
    return this.menteesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menteesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenteeDto: UpdateMenteeDto) {
    return this.menteesService.update(+id, updateMenteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menteesService.remove(+id);
  }
}
