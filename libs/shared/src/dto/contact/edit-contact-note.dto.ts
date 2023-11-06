import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { ApiSingleFile } from '../../custom';
export class EditContactNoteDto {
  @ApiSingleFile({ required: false })
  @IsOptional()
  attachment: any;

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
