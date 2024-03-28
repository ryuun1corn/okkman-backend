import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SponsorsService {
  constructor(private prisma: PrismaService) {}

  async create(createSponsorDto: CreateSponsorDto) {
    return await this.prisma.sponsor.create({
      data: {
        name: createSponsorDto.name,
        package: createSponsorDto.package,
        events: {
          connect: createSponsorDto.event_ids.map((event_id) => ({
            id: event_id,
          })),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.sponsor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.sponsor.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return await this.prisma.sponsor.update({
      where: {
        id: id,
      },
      data: updateSponsorDto,
    });
  }

  async remove(id: number) {
    await this.prisma.sponsor.delete({
      where: {
        id: id,
      },
    });
  }
}
