import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditFolderDto {
  @ApiProperty({
    required: false,
    example: '651f8ef1ce48c8eb739ca5ae',
  })
  @IsOptional()
  parentFolderId: string;

  @ApiProperty({
    required: false,
    example: 'my folder',
  })
  @IsOptional()
  name: string;
  id: string;

  createdBy?: string;
  updatedBy?: string;
  updatedAt?: Date;
}
