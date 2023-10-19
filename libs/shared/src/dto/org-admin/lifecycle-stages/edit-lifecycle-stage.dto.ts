import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditLifecycleStageDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Subscriber',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Subscriber Description',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsOptional()
  description: string;

  updatedBy: string;
  id: string;
}
