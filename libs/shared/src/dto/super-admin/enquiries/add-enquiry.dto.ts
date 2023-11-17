import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class AddEnquiryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Looking for your sales products',
  })
  @IsNotEmpty()
  @IsString()
  query: string;

  @Transform(toMongoObjectId)
  createdBy: string;
}
