import { ApiProperty } from '@nestjs/swagger';
import { paginationDTO } from '../pagination/pagination.dto';
import { IsOptional } from 'class-validator';

export class FilterFilesDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  folderId: string;

  @ApiProperty({
    example: 'My cv',
    required: false,
  })
  @IsOptional()
  search: string;
}
