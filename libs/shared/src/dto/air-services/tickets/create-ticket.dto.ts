import { ApiProperty } from '@nestjs/swagger';
import {
  TicketInternalTypeEnum,
  TicketPirorityEnum,
  TicketStatusEnum,
  TicketTypeEnum,
} from '@shared/constants';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTicketDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: TicketStatusEnum.OPEN,
    enum: TicketStatusEnum,
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsObject()
  @ApiProperty({
    example: {
      note: 'any note',
    },
  })
  details: string;

  @ApiProperty({ example: 'test subject' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    type: String,
    required: true,
    example: TicketPirorityEnum.HIGH,
    enum: TicketInternalTypeEnum,
  })
  @IsString()
  @IsNotEmpty()
  pirority;

  @ApiProperty({
    type: String,
    required: true,
    example: TicketInternalTypeEnum.INTERNAL,
    enum: TicketInternalTypeEnum,
  })
  @IsString()
  @IsNotEmpty()
  internalType;

  @ApiProperty({
    type: String,
    required: true,
    example: TicketTypeEnum.INTERNAL,
    enum: TicketTypeEnum,
  })
  @IsString()
  @IsNotEmpty()
  type;
}
