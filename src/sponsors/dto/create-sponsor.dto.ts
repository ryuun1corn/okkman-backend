import { SPONSOR_PACKAGE } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEnum(SPONSOR_PACKAGE)
  package: SPONSOR_PACKAGE;

  @IsOptional()
  @IsInt({
    each: true,
  })
  event_ids: number[];
}
