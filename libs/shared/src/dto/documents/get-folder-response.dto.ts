import { ApiProperty } from '@nestjs/swagger';
import { paginationDTO } from '../pagination/pagination.dto';
import { IsOptional } from 'class-validator';

export class GetFoldersResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65154bdc3064871640f8ce14',
        createdById: '65154bdc3064871640f8ce14',
        name: 'folderName',
        files: [],
        subfolders: [],
        createdAt: '2023-09-27T12:00:00Z',
        updatedAt: '2023-09-27T12:00:00Z',
      },
    ],
  })
  data: [object];

  @ApiProperty({ example: 8 })
  count: number;

  @ApiProperty({
    example: [
      {
        page: 1,
        limit: 10,
        totalPages: 1,
        resultCount: 8,
        totalResult: 8,
      },
    ],
  })
  pagination: object;

  @ApiProperty({ example: null })
  errors: [];
}
