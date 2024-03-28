import { ENTRANCE_METHOD } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class CreateMenteeDto {
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

  @IsEnum(ENTRANCE_METHOD)
  entrance_method: ENTRANCE_METHOD;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @Max(999)
  group_number: number;
}
