import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
export class EditContactNoteDto {
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  attachmentId: string;

  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsOptional()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  contactId: string;

  @ApiProperty({
    example: 'some note',
    type: String,
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'some description',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  contactNoteId: string;

  updatedBy?: string;
}
