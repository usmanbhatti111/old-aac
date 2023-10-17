import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from '@shared/constants';
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  isEnum,
} from 'class-validator';
import { paginationDTO } from '../../../pagination/pagination.dto';

export class GetTaskManagementDto extends paginationDTO {
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignTo?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  priority: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '',
  })
  @IsISO8601()
  @IsOptional()
  dueDate?: Date;
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
