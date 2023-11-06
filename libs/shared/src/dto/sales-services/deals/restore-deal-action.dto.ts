import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'libs/shared/src/functions';
import { IdDto } from '../../common';
import { EIsDeletedStatus } from '@shared/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestoreDealActionDto extends IdDto {
  @ApiProperty({
    type: String,
    enum: [EIsDeletedStatus.HARD_DELETED, EIsDeletedStatus.ACTIVE],
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  action: string;

  @Transform(toMongoObjectId)
  deletedBy: string;
}
