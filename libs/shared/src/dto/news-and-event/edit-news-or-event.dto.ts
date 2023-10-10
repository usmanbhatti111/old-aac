import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ENewsAndEventsTypes, EStatusToggle } from '@shared/constants';
export class EditNewsOrEventDto {
  @ApiProperty({ required: false, example: 'Twitter Logo' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: ENewsAndEventsTypes.NEWS,
    enum: ENewsAndEventsTypes,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false, example: 'Elon Musk changed Twitter Logo' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
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
