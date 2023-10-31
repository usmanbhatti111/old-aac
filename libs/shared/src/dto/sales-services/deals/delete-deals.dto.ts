import { Transform } from 'class-transformer';
import { IdsDto } from '../../common';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class DeleteDealsDto extends IdsDto {
  @Transform(toMongoObjectId)
  deletedBy: string;
}
