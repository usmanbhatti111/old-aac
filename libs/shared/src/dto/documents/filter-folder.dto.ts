import { ApiProperty } from '@nestjs/swagger';
import { paginationDTO } from '../pagination/pagination.dto';
import { IsOptional } from 'class-validator';

export class FilterFolderDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  createdById: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  parentFolderId: string;

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  search: string;

  organizationId: string;
}
