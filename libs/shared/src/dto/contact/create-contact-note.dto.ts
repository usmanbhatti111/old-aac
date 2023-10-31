import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { ApiSingleFile } from '../../custom';
export class CreateContactNoteDto {
  attachmentId?: string;

  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactId: string;

  @ApiSingleFile({ required: false })
  @IsOptional()
  attachment: any;

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
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  createdBy?: string;

  updatedBy?: string;
}
