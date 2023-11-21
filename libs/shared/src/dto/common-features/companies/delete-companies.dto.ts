import { toMongoObjectId } from 'libs/shared/src/functions';
import { IdsDto } from '../../common/ids.dto';
import { Transform } from 'class-transformer';

export class DeleteCompaniesDto extends IdsDto {
  @Transform(toMongoObjectId)
  deletedById: string;
}
