import { toMongoObjectId } from 'libs/shared/src/functions';
import { IdsDto } from '../../common';
import { Transform } from 'class-transformer';

export class DeleteTaxsDto extends IdsDto {
  @Transform(toMongoObjectId)
  deletedBy: string;
}
