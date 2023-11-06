import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '../../common';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { TicketPirorityEnum, TicketStatusEnum } from '../../../constants';

export class BulkTicketUpdateDto {
  @IsString()
  @ApiProperty({
    type: String,
    enum: TicketPirorityEnum,
    required: false,
  })
  pirority: string;

  @IsString()
  @ApiProperty({
    type: String,
    enum: TicketStatusEnum,
    required: false,
  })
  status: string;
  @IsString()
  @ApiProperty({
    type: String,
    example: '654394cdc07b96f683eb3f9b',
    required: false,
  })
  categoryId: string;
}
