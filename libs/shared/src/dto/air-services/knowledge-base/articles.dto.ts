import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';
import { EArticlesStatus } from '@shared/constants';

export class WriteArticleDTO {
  @ApiProperty({
    example: 'Lorem Ipsum is simply dummy text of the printing...',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ example: '6541275fbbc8e76724cb773c' })
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

  author?: string;

  organizationId?: string;
}

export class GetArticlesDto extends paginationDTO {
  @ApiProperty({ type: String, example: '', required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  authorId: string;

  @ApiProperty({
    type: String,
    enum: EArticlesStatus,
    example: '',
    required: false,
  })
  @IsEnum(EArticlesStatus)
  @IsOptional()
  status: string;

  organizationId?: string;
}

export class GetUnapprovedArticlesDto extends paginationDTO {
  userId?: string;

  organizationId?: string;
}
