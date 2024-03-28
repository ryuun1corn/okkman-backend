import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SponsorsService {
  constructor(private prisma: PrismaService) {}

  create(createSponsorDto: CreateSponsorDto) {
    return 'This action adds a new sponsor';
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

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return `This action updates a #${id} sponsor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sponsor`;
  }
}
