import { IdDto } from '../../common';

export class DeleteContactStatusDto extends IdDto {
  deletedBy: string;
}
