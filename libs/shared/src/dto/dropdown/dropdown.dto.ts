import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetAllDropdownResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '652e0066d73b5bebfb0ab48a',
        name: 'Air Sales',
      },
    ],
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class GetAllSearchDTO {
  @ApiProperty({
    type: String,
    required: false,
    description: 'search by name',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
