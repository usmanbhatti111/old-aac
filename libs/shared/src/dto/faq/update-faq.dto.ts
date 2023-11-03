import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { CreateFaqDto } from './create-faq.dto';

export class UpdateFaqDto extends PartialType(
  OmitType(CreateFaqDto, ['createdBy'] as const)
) {
  @Transform(toMongoObjectId)
  updatedBy: string;

  id: string;
}
