import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpeakersService {
  constructor(private prisma: PrismaService) {}

  async create(createSpeakerDto: CreateSpeakerDto) {
    createSpeakerDto.event_ids = createSpeakerDto.event_ids || [];
    await this.prisma.speaker.create({
      data: {
        name: createSpeakerDto.name,
        events: {
          connect: createSpeakerDto.event_ids.map((event_id) => ({
            id: event_id,
          })),
        },
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
}
