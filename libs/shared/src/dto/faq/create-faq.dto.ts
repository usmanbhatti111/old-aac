import { ApiProperty } from '@nestjs/swagger';
import { EFaqCategories } from '../../constants';
import { IsNotEmpty, IsString } from 'class-validator';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class CreateFaqDto {
  @ApiProperty({
    required: true,
    example: 'test question',
  })
  @IsNotEmpty()
  @IsString()
  faqQuestion: string;

  @ApiProperty({
    enum: EFaqCategories,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  faqCategory: string;

  @ApiProperty({
    example: 'test answer',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  faqAnswer: string;

  @Transform(toMongoObjectId)
  createdBy: string;
}
