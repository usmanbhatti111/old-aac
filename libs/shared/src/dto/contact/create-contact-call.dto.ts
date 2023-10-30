import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId, IsOptional, IsString } from 'class-validator';
import { OutcomeEnum } from '../../constants/enums';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class CreateContactCallDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'title',
  })
  title: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  attachmentId: string;

  @ApiProperty({
    example: 'note',
    type: String,
  })
  @IsString()
  @IsOptional()
  note: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactOwnerId: string;

  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactId: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    isArray: true,
  })
  assignee: string[];

  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  endDate: Date;

  @IsISO8601()
  @ApiProperty({
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

  createdBy?: string;

  updatedBy?: string;
}
``;
