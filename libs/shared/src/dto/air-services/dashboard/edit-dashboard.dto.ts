import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class EditDashboardtDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Name',
    required: true,
  })
  name: string;
}
