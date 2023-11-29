import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../common';
export class ListVendorsRequestDto extends PaginationDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;

  companyId: string;
}

export class ListVendorsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      vendors: [
        {
          _id: '656659b1555a923c5709bd4e',
          name: 'john',
          contactName: 'john',
          phone: '123456789',
          mobile: '123456789',
          email: 'abc@yopmail.com',
          description: 'string',
          address: 'string',
          country: 'pakistan',
          state: 'pk',
          city: 'islamabad',
          zipCode: '47000',
          createdAt: '2023-11-28T21:20:49.260Z',
          updatedAt: '2023-11-28T21:20:49.260Z',
        },
      ],
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}

export class GetVendorsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      vendors: [
        {
          _id: '656659b1555a923c5709bd4e',
          name: 'john',
          contactName: 'john',
          phone: '123456789',
          mobile: '123456789',
          email: 'abc@yopmail.com',
          description: 'string',
          address: 'string',
          country: 'pakistan',
          state: 'pk',
          city: 'islamabad',
          zipCode: '47000',
          createdAt: '2023-11-28T21:20:49.260Z',
          updatedAt: '2023-11-28T21:20:49.260Z',
        },
      ],
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}
