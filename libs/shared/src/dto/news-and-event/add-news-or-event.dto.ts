import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ENewsAndEventsTypes } from '@shared/constants';
export class AddNewsOrEventDto {
  @ApiProperty({ example: 'Twitter Logo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: ENewsAndEventsTypes.NEWS,
    enum: ENewsAndEventsTypes,
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'Elon Musk changed Twitter Logo' })
  @IsString()
  @IsNotEmpty()
  description: string;

  createdBy: string;
}
