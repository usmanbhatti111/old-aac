import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../../functions';

export class GetDealViewsDto {
  @Transform(toMongoObjectId)
  userId?: string;
}
