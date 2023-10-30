import { IntersectionType } from '@nestjs/swagger';
import { DealFilterSearchDto } from './deals-filter-search.dto';
import { PaginationDto } from '../../common';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class GetDealsListViewDto extends IntersectionType(
  DealFilterSearchDto,
  PaginationDto
) {
  @Transform(toMongoObjectId)
  userId: string;
}
