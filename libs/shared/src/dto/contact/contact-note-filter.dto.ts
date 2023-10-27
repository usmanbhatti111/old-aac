import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class ContactNoteFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  contactId: string;
}
