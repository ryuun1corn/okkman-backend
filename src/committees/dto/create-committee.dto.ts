import { BADAN_PENGURUS_HARIAN_TYPE, PENGURUS_INTI_TYPE } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsEnum,
} from 'class-validator';

export class CreateCommitteeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  faculty: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  major: string;

  @IsNumber()
  @Min(1950)
  @Max(2024)
  @IsInt()
  entrance_year: number;

  @IsEnum({ ...BADAN_PENGURUS_HARIAN_TYPE, ...PENGURUS_INTI_TYPE })
  committee_subtype: BADAN_PENGURUS_HARIAN_TYPE | PENGURUS_INTI_TYPE;
}
