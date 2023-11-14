import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AddEnquiryDto } from './add-enquiry.dto';
import { EEnquiriesStatus } from '../../../constants';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../../functions';

export class UpdateEnquiryDto extends PartialType(
  OmitType(AddEnquiryDto, ['createdBy'] as const)
) {
  @ApiProperty({
    type: String,
    enum: EEnquiriesStatus,
    example: EEnquiriesStatus.DONE,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Reply of Looking for your sales products',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  comment: string;

  @Transform(toMongoObjectId)
  updatedBy: string;

  id: string;
}
