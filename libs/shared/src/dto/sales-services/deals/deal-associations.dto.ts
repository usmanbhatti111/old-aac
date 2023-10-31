import { ApiProperty } from '@nestjs/swagger';
import { AttachmentDTO, OrganizationDto, SalesProductDto } from '@shared/dto';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class DealAssociationDto {
  
  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  dealId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  contactId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  ticketId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  companyId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  productId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  quoteId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  attachmentId?: string;
}

export class DealAssociationResponseDto {
  
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      dealId: '6538bb480b3f9e9d83d4a2ce',
      contacts: [],
      tickets: [],
      companies: [OrganizationDto],
      products: [SalesProductDto],
      quotes: [],
      attachments: [AttachmentDTO],
    }
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];

  
}

