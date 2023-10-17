import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ContactIdParamDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  contactId: string;
}
