import { PickType } from '@nestjs/mapped-types';
import { CreateSpeakerDto } from './create-speaker.dto';

export class UpdateSpeakerDto extends PickType(CreateSpeakerDto, [
  'name',
] as const) {}
