import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from '../../common';
import { Transform, Type } from 'class-transformer';

export class GetTicketByIdDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '651d72b06c9932a97b031a34',
  })
  @IsMongoId()
  @IsNotEmpty()
  ticketId: string;
}

export class GetAssociateAssetsDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '651d72b06c9932a97b031a34',
  })
  @IsString()
  @IsNotEmpty()
  ticketId: string;
}

export class ListTicketDTO extends PaginationDto {}
