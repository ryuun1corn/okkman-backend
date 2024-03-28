import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    createEventDto.sponsor_ids = createEventDto.sponsor_ids || [];
    createEventDto.speaker_ids = createEventDto.speaker_ids || [];
    // To remove the unwanted fields
    const eventData = {
      ...createEventDto,
      speaker_ids: undefined,
      sponsor_ids: undefined,
    };
    return await this.prisma.event.create({
      data: {
        ...eventData,
        sponsors: {
          connect: createEventDto.sponsor_ids.map((id) => ({
            id: id,
          })),
        },
        speakers: {
          connect: createEventDto.speaker_ids.map((id) => ({
            id: id,
          })),
        },
      },
      include: {
        speakers: createEventDto.speaker_ids.length !== 0 ?? false,
        sponsors: createEventDto.sponsor_ids.length !== 0 ?? false,
      },
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
