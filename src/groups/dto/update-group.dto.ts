import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(
  PickType(CreateGroupDto, ['number'] as const),
) {}
