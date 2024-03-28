import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateSpeakerDto } from './create-speaker.dto';

export class UpdateSpeakerDto extends PartialType(
  PickType(CreateSpeakerDto, ['name'] as const),
) {}
