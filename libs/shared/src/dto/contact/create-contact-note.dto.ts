import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactNoteDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  attachmentId: string;

  @IsMongoId()
  @IsNotEmpty()
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
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'some description',
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  createdBy?: string;

  updatedBy?: string;
}
