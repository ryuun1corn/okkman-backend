import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpeakersService {
  constructor(private prisma: PrismaService) {}

  create(createSpeakerDto: CreateSpeakerDto) {
    return 'This action adds a new speaker';
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

  update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    return `This action updates a #${id} speaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} speaker`;
  }
}
