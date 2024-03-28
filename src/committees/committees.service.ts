import { Injectable } from '@nestjs/common';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';
import { PrismaService } from 'src/prisma.service';
import {
  BADAN_PENGURUS_HARIAN_TYPE,
  COMMITTEE_TYPE,
  PENGURUS_INTI_TYPE,
} from '@prisma/client';

@Injectable()
export class CommitteesService {
  constructor(private prisma: PrismaService) {}

  async create(createCommitteeDto: CreateCommitteeDto) {
    const committeeTyping: {
      committee_type: COMMITTEE_TYPE;
      pengurus_inti_type: PENGURUS_INTI_TYPE | null;
      bph_type: BADAN_PENGURUS_HARIAN_TYPE | null;
    } = {
      committee_type: 'BADAN_PENGURUS_HARIAN',
      pengurus_inti_type: null,
      bph_type: 'PROJECT',
    };

    if (
      Object.values(BADAN_PENGURUS_HARIAN_TYPE).includes(
        createCommitteeDto.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE,
      )
    ) {
      committeeTyping.bph_type =
        createCommitteeDto.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE;
    } else {
      (committeeTyping.committee_type = 'PENGURUS_INTI'),
        (committeeTyping.pengurus_inti_type =
          createCommitteeDto.committee_subtype as PENGURUS_INTI_TYPE);
      committeeTyping.bph_type = null;
    }

    return await this.prisma.committee.create({
      data: {
        name: createCommitteeDto.name,
        faculty: createCommitteeDto.faculty,
        major: createCommitteeDto.major,
        entrance_year: createCommitteeDto.entrance_year,
        committee_type: committeeTyping.committee_type,
        bph_type: committeeTyping.bph_type,
        pengurus_inti_type: committeeTyping.pengurus_inti_type,
      },
    });
  }

  async findAll() {
    return await this.prisma.committee.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.committee.findUnique({
      where: {
        id: id,
      },
      include: {
        group: true,
      },
    });
  }

  async findAllMentors() {
    console.log('getting mentors');
    return await this.prisma.committee.findMany({
      where: {
        bph_type: 'MENTOR',
      },
      include: {
        group: true,
      },
    });
  }

  async update(id: number, updateCommitteeDto: UpdateCommitteeDto) {
    const committeeTyping: {
      committee_type: COMMITTEE_TYPE;
      pengurus_inti_type: PENGURUS_INTI_TYPE | null;
      bph_type: BADAN_PENGURUS_HARIAN_TYPE | null;
    } = {
      committee_type: 'BADAN_PENGURUS_HARIAN',
      pengurus_inti_type: null,
      bph_type: 'PROJECT',
    };
    if (updateCommitteeDto.committee_subtype) {
      if (
        Object.values(BADAN_PENGURUS_HARIAN_TYPE).includes(
          updateCommitteeDto.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE,
        )
      ) {
        committeeTyping.bph_type =
          updateCommitteeDto.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE;
      } else {
        (committeeTyping.committee_type = 'PENGURUS_INTI'),
          (committeeTyping.pengurus_inti_type =
            updateCommitteeDto.committee_subtype as PENGURUS_INTI_TYPE);
        committeeTyping.bph_type = null;
      }
    }

    return await this.prisma.committee.update({
      where: {
        id: id,
        group:
          updateCommitteeDto.committee_subtype === 'MENTOR' ? undefined : null,
      },
      data:
        updateCommitteeDto &&
        (updateCommitteeDto.committee_subtype ? committeeTyping : {}),
    });
  }

  async remove(id: number) {
    await this.prisma.committee.delete({
      where: {
        id: id,
      },
    });
  }
}
