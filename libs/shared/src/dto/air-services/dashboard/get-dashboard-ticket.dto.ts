import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
export class FilterTicketDto {
  @IsOptional()
  @ApiProperty({
    required: true,
    example: 'status',
    enum: ['status', 'pirority'],
  })
  @IsEnum(['status', 'pirority'])
  filterBy: string;
}
