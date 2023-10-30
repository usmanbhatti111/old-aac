import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from '../../functions';

export class ContactCallDeleteDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  contactCallId: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  deletedBy: string;
}
