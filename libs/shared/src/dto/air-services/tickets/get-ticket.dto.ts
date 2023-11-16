import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common';
import { EExportFile } from '@shared/constants';

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

export class ListTicketDTO extends PaginationDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  @IsEnum(EExportFile)
  @IsOptional()
  exportType: string;
}
