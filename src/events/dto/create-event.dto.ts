import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(1000)
  description?: string;
}
