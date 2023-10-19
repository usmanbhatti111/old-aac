import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class EditContactNoteDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  attachmentId: string;

  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactId: string;

  @ApiProperty({
    example: 'some note',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'some description',
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  contactNoteId: string;

  updatedBy?: string;
}
