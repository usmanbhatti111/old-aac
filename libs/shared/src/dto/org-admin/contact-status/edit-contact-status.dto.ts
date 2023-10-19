import { ApiProperty } from '@nestjs/swagger';
import { EStatusToggle } from '@shared/constants';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditContactStatusDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'New',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'New Contact Status',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    example: EStatusToggle.ACTIVE,
    enum: EStatusToggle,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  updatedBy: string;
  id: string;
}
