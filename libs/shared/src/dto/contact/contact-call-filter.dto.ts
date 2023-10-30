import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class ContactCallFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '652e11c51c10d7d373d23b05',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  contactId: string;
}
