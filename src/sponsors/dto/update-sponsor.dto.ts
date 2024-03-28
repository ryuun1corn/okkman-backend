import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSponsorDto } from './create-sponsor.dto';

export class UpdateSponsorDto extends PartialType(
  OmitType(CreateSponsorDto, ['event_ids'] as const),
) {}
