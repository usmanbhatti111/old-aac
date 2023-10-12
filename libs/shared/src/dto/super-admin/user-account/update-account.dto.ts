import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  manageRole: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  status: string;
}
