import { ApiProperty } from '@nestjs/swagger';
import { paginationDTO } from '../pagination/pagination.dto';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    required: true,
    example: 'my cv',
  })
  name: string;
  @ApiProperty({
    required: true,
    example: 'https://www.example.com/dummy-image.jpg',
  })
  media: string;
  @ApiProperty({
    required: true,
    example: '651f8ef1ce48c8eb739ca5ae',
  })
  folderId: string;

  createdBy?: string;
  updatedBy?: string;

  organizationId: string;
}
