import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddPlanTypeDto {
  @ApiProperty({
    example: 'growth',
  })
  @IsOptional()
  @IsString()
  name: string;

  createdBy: string;
}
