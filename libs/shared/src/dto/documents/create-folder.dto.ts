import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  createdBy?: string;

  organizationId: string;
}
