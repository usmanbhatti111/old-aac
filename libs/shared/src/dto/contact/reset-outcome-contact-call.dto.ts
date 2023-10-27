import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { OutcomeEnum } from '../../constants';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class ResetOutcomeContactCallDto {
  @ApiProperty({
    type: 'string',
    enum: OutcomeEnum,
    enumName: 'Outcome',
    required: true,
  })
  outcome: string;

  @ApiProperty({
    example: 'note',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;

  @Transform(toMongoObjectId, { toClassOnly: true })
  contactCallId: string;

  updatedBy: string;
}
