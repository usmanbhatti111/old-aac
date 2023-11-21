import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IdDto } from './id.dto';
import { PaginationDto } from './pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { MediaObject } from './media.dto';
import { ApiSingleFile } from '../../custom';

export class CreateNoteDto {
  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: true,
  })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  recordId: string;

  @ApiProperty({
    type: String,
    example: 'Note title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'description of Note',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiSingleFile({ required: false })
  @IsOptional()
  @IsNotEmpty()
  file: MediaObject;

  createdBy?: string;
}

export class UpdateNoteDto extends PartialType(
  OmitType(CreateNoteDto, ['createdBy'] as const)
) {
  @Transform(toMongoObjectId)
  id: string;

  @Transform(toMongoObjectId)
  updatedBy?: string;
}

export class DeleteNoteDto extends IdDto {
  @Transform(toMongoObjectId)
  deletedBy: string;
}

export class GetNoteDto extends IdDto {
  @Transform(toMongoObjectId)
  createdBy: string;
}

export class GetNotesDto extends PaginationDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  recordId: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Search By title or description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;

  @Transform(toMongoObjectId)
  createdBy: string;
}

export class CreateNoteResponseDto {
  @ApiProperty({
    example: 201,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '6555ad1b966d117a7fe652f6',
      recordId: '653b48c5976aabdb035a6f8f',
      title: 'Note title',
      description: 'description of Note',
      file: {
        id: '3fd84b31-7414-49df-85f8-5f431bbd551f',
        url: 'notes/3fd84b31-7414-49df-85f8-5f431bbd551f.jpg',
        size: 39929,
        mimetype: 'image/jpeg',
      },
      createdBy: '65488ce0ff900ee743130657',
      isDeleted: false,
      createdAt: '2023-11-16T05:48:11.746Z',
      updatedAt: '2023-11-16T05:48:11.746Z',
    },
  })
  data: object;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class GetNoteResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '6555ad1b966d117a7fe652f6',
      recordId: '56cb91bdc3464f14678934ca',
      title: 'Note title',
      description: 'description of Note',
      file: {
        id: '3fd84b31-7414-49df-85f8-5f431bbd551f',
        url: 'notes/3fd84b31-7414-49df-85f8-5f431bbd551f.jpg',
        size: 39929,
        mimetype: 'image/jpeg',
      },
      createdBy: '65488ce0ff900ee743130657',
      isDeleted: false,
      createdAt: '2023-11-16T05:48:11.746Z',
      updatedAt: '2023-11-16T05:48:11.746Z',
    },
  })
  data: object;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class UpdateNoteResponseDto extends GetNoteResponseDto {}

export class GetNotesResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    example: {
      notes: [
        {
          _id: '6555b10efb838ed6aa544fe5',
          recordId: '56cb91bdc3464f14678934ca',
          title: 'Note title 2',
          description: 'description of Note',
          createdBy: '65488ce0ff900ee743130657',
          isDeleted: false,
          createdAt: '2023-11-16T06:05:02.184Z',
          updatedAt: '2023-11-16T06:05:02.184Z',
          user: {
            _id: '65488ce0ff900ee743130657',
            name: ' Super Admin',
            profileImage: '',
          },
        },
        {
          _id: '6555ad1b966d117a7fe652f6',
          recordId: '56cb91bdc3464f14678934ca',
          title: 'Note title',
          description: 'description of Note',
          file: {
            id: '3fd84b31-7414-49df-85f8-5f431bbd551f',
            url: 'notes/3fd84b31-7414-49df-85f8-5f431bbd551f.jpg',
            size: 39929,
            mimetype: 'image/jpeg',
          },
          createdBy: '65488ce0ff900ee743130657',
          isDeleted: false,
          createdAt: '2023-11-16T05:48:11.746Z',
          updatedAt: '2023-11-16T05:48:11.746Z',
          user: {
            _id: '65488ce0ff900ee743130657',
            name: ' Super Admin',
            profileImage: '',
          },
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

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
