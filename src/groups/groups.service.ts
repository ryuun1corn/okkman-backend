import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({
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
    return this.prisma.group.findMany();
  }

  async findOne(id: number) {
    return this.prisma.group.findUnique({
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
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    return await this.prisma.group.delete({
      where: {
        id: id,
      },
    });
  }
}
