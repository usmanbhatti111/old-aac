import { toMongoObjectId } from 'libs/shared/src/functions';
import { IdsDto } from '../../common';
import { Transform } from 'class-transformer';

export class DeleteEnquiriesDto extends IdsDto {
  @Transform(toMongoObjectId)
  deletedBy: string;
}
