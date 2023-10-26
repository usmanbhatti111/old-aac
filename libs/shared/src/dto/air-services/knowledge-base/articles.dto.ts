import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class WriteArticleDTO {
  @ApiProperty({
    example: 'Lorem Ipsum is simply dummy text of the printing...',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ example: '63f729ebfffff62317142f74' })
  @IsMongoId()
  @IsNotEmpty()
  folder: string;

  @ApiProperty({ example: '#tags' })
  @IsString()
  @IsOptional()
  tags: string;

  @ApiProperty({ example: 'keywords' })
  @IsString()
  @IsOptional()
  keywords: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isApprovel: boolean;

  @ApiProperty({ example: '63f729ebfffff62317142f74' })
  @ValidateIf((value) => value.isApprovel === true)
  @IsMongoId()
  approver: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @ValidateIf((value) => value.isApprovel === true)
  @IsISO8601()
  reviewDate: Date;
}
