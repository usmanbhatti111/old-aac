import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';

export class ContactNoteFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  contactId: string;
}
