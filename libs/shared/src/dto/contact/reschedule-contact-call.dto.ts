import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class RescheduleContactCallDto {
  @IsISO8601()
  @ApiProperty({
    required: false,
    example: new Date().toISOString(),
  })
  startDate: Date;

  @Transform(toMongoObjectId, { toClassOnly: true })
  contactCallId: string;

  updatedBy: string;
}
