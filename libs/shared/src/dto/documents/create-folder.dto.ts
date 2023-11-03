import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EFolderType } from '../../constants/enums';

export class CreateFolderDto {
  @ApiProperty({
    required: true,
    example: 'my folder',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    example: '651f8ef1ce48c8eb739ca5ae',
  })
  @IsMongoId()
  @IsOptional()
  parentFolderId: string;

  @ApiProperty({
    required: false,
    example: EFolderType.KNOWLEDGE_BASE,
    enum: EFolderType,
  })
  @IsEnum(EFolderType)
  @IsOptional()
  type: string;

  createdBy?: string;

  organizationId: string;
}
