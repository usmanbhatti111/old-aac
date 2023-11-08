import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class ContactMultiDto {
  @ApiProperty({
    required: true,
    type: String,
    isArray: true,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  @IsArray()
  contactIds: string[];

  deletedBy?: string;

  updatedBy?: string;

  contactOwnerId?: string;
}
