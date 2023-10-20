import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ContactNoteDeleteDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  contactNoteId: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  deletedBy: string;
}
