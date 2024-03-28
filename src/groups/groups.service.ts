import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    return await this.prisma.group.create({
      data: {
        number: createGroupDto.number,
        mentor: {
          connect: {
            id: createGroupDto.mentor_id,
            bph_type: 'MENTOR',
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.group.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.group.findUnique({
      where: {
        id: id,
      },
      include: {
        mentees: true,
        mentor: true,
      },
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.prisma.group.update({
      where: {
        id: id,
      },
      data: updateGroupDto,
    });
  }

  async remove(id: number) {
    await this.prisma.group.delete({
      where: {
        id: id,
      },
    });
  }
}
