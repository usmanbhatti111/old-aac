import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId, IsOptional, IsString } from 'class-validator';
import { OutcomeEnum } from '../../constants/enums';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class EditContactMeetingDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    example: 'title',
  })
  title: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  attachmentId: string;

  @ApiProperty({
    example: 'note',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  contactOwnerId: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  contactId: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
  })
  assignee: string[];

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    required: false,
    example: new Date().toISOString(),
  })
  endDate: Date;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    required: false,
    example: new Date().toISOString(),
  })
  startDate: Date;

  @ApiProperty({
    type: 'string',
    required: false,
    enum: OutcomeEnum,
    enumName: 'Outcome',
  })
  @IsOptional()
  outcome: string;

  contactMeetingId: string;

  updatedBy?: string;
}
