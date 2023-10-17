import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ContactDeleteDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  contactId: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  deletedBy: string;
}
