import { IdsDto } from '../common';

export class DeleteNewsOrEventsDto extends IdsDto {
  deletedBy: string;
}
