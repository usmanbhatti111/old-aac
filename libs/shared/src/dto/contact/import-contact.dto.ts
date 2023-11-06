import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ContactDto } from './contact.dto';
import { Type } from 'class-transformer';

export class ImportContactDto {
  @ApiProperty({
    required: true,
    type: () => ContactDto,
    isArray: true,
  })
  @Type(() => ContactDto)
  @IsNotEmpty()
  @IsArray()
  contacts: ContactDto[];

  columnNames?: string[];

  createdBy?: string;
}
