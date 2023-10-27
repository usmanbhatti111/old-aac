import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class ContactDeleteDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  contactId: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  deletedBy: string;
}
