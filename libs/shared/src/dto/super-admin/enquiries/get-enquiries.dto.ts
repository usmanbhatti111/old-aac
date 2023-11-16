import { ApiProperty } from '@nestjs/swagger';
import { EEnquiriesStatus } from '../../../constants';
import { PaginationDto } from '../../common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetEnquiriesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    enum: EEnquiriesStatus,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'search by name, company Name and Email',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;
}
