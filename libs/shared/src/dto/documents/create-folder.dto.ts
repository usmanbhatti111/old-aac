import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty({
    required: true,
    example: 'my folder',
  })
  name: string;

  @ApiProperty({
    required: false,
    example: '651f8ef1ce48c8eb739ca5ae',
  })
  parentFolderId: string;

  createdBy?: string;
  updatedBy?: string;

  organizationId: string;
}
