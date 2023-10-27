import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { IdDto, PaginationDto } from '../common';

export interface INote {
  title: string;
  description?: string;
  fileUrl?: string;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
}
export class CreateNoteDto {
  @ApiProperty({
    example: 'Note title',
  })
  title: string;

  @ApiProperty({
    example: 'description of Note',
  })
  description?: string;

  @ApiProperty({
    example: 'www.s3/Notetitle.pdf',
  })
  fileUrl?: string;

  createdBy?: string;
}

export class UpdateNoteDto extends CreateNoteDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id?: string;

  updatedBy?: string;
}
export class NoteDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization.',
  })
  id: string;

  @ApiProperty({
    example: 'Note title',
  })
  title: string;

  @ApiProperty({
    example: 'description of Note',
  })
  description?: string;

  @ApiProperty({
    example: 'www.s3/Notetitle.pdf',
  })
  fileUrl?: string;
}

export class NoteResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: NoteDto,
  })
  data: NoteDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class NotesResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: [NoteDto],
  })
  data: NoteDto[];

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class DeleteNoteResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class DeleteNoteDto extends IdDto {
  deletedBy: string;
}

export class GetNotesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search By title or description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
