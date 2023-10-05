import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface IExample {
  id?: string;
  title: string;
  description: string;
}

export class CreateExampleDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsNotEmpty()
  description: string;
}

export class CreateExampleResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      title: 'Heading',
      description: 'new description',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
