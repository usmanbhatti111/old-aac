import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class DealNoteDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  dealId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  noteId: string;
}

export class DealNotesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
