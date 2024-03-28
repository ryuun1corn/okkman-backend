import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return await this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.event.findUnique({
      where: { id },
      include: {
        speakers: true,
        sponsors: true,
      },
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.event.delete({
      where: { id },
    });
  }
}
