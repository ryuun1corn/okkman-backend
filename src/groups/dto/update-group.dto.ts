import { PickType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PickType(CreateGroupDto, [
  'number',
] as const) {}
