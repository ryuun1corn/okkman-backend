import { IsInt, IsNumber, IsPositive, Max } from 'class-validator';

export class CreateGroupDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Max(999)
  number: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  mentor_id: number;
}
