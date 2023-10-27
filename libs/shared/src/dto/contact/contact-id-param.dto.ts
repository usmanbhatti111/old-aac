import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class ContactIdParamDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  contactId: string;
}
