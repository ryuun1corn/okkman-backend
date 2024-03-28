import { Injectable } from '@nestjs/common';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { UpdateMenteeDto } from './dto/update-mentee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenteesService {
  constructor(private prisma: PrismaService) {}

  async create(createMenteeDto: CreateMenteeDto) {
    return await this.prisma.mentee.create({
      data: createMenteeDto,
    });
  }

  async findAll() {
    return await this.prisma.mentee.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.mentee.findUnique({
      where: {
        id: id,
      },
      include: {
        group: true,
      },
    });
  }

  update(id: number, updateMenteeDto: UpdateMenteeDto) {
    return `This action updates a #${id} mentee`;
  }

  async remove(id: number) {
    await this.prisma.mentee.delete({
      where: {
        id: id,
      },
    });
  }
}
