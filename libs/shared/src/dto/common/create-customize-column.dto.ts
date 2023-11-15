import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class CustomizeColumnsObject {
  slug: string;
  attributes: string;
  active?: boolean;
  order: number;
}

export class CreateCustomizeColumnDto {
  @Transform(toMongoObjectId)
  userId?: string;
  type: string;
  columns: CustomizeColumnsObject[];
}
