import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common';

export class GetTaskDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  assignee: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  priority: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}

export class GetTaskListDto extends PaginationDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  ticketId: string;
}
