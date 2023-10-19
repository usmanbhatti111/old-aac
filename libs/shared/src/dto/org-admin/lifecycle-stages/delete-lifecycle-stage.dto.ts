import { IdDto } from '../../common';

export class DeleteLifecycleStageDto extends IdDto {
  deletedBy: string;
}
