import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../../functions';
import { DealFilterSearchDto } from './deals-filter-search.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetDealsGridtViewDto extends OmitType(DealFilterSearchDto, [
  'search',
] as const) {
  @ApiProperty({
    type: String,
    required: false,
    description: 'search by deal name, owner name, deal stage',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;

  @Transform(toMongoObjectId)
  userId: string;
}
