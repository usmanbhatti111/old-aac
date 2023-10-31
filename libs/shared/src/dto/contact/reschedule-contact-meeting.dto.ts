import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601 } from 'class-validator';
import { toMongoObjectId } from '../../functions';

export class RescheduleContactMeetingDto {
  @IsISO8601()
  @ApiProperty({
    required: false,
    example: new Date().toISOString(),
  })
  startDate: Date;

  @Transform(toMongoObjectId, { toClassOnly: true })
  contactMeetingId: string;

  updatedBy: string;
}
