import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddLifecycleStageDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Subscriber',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Subscriber Description',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  createdBy: string;
}
