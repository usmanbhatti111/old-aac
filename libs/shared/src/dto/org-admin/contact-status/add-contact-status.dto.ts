import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddContactStatusDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'New',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'New Contact Status',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  createdBy: string;
}
