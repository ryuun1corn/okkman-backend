import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpeakersService {
  constructor(private prisma: PrismaService) {}

  async create(createSpeakerDto: CreateSpeakerDto) {
    createSpeakerDto.event_ids = createSpeakerDto.event_ids || [];
    return await this.prisma.speaker.create({
      data: {
        name: createSpeakerDto.name,
        events: {
          connect: createSpeakerDto.event_ids.map((event_id) => ({
            id: event_id,
          })),
        },
      },
      include: {
        events: createSpeakerDto.event_ids.length !== 0 ?? false,
      },
    });
  }

  async findAll() {
    return await this.prisma.speaker.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.speaker.findUnique({
      where: {
        id: id,
      },
      include: {
        events: true,
      },
    });
  }

  async update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    return await this.prisma.speaker.update({
      where: {
        id: id,
      },
      data: updateSpeakerDto,
    });
  }

  async remove(id: number) {
    await this.prisma.speaker.delete({
      where: {
        id: id,
      },
    });
  }

  async connectEvent(eventId: number, speakerId: number) {
    return await this.prisma.speaker.update({
      where: {
        id: speakerId,
      },
      data: {
        events: {
          connect: {
            id: eventId,
          },
        },
      },
      include: {
        events: true,
      },
    });
  }

  async removeEvent(eventId: number, speakerId: number) {
    return await this.prisma.speaker.update({
      where: {
        id: speakerId,
      },
      data: {
        events: {
          disconnect: {
            id: eventId,
          },
        },
      },
      include: {
        events: true,
      },
    });
  }
}
