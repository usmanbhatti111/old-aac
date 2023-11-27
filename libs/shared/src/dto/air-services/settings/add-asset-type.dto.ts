import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class AddAssetTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: true,
  })
  Name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: false,
  })
  Description: string;

  createdBy: string;

  companyId: string;
}
export class AddAssetTypeResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6560d01291a06861ed56af49',
      Name: 'Title Name',
      Description: 'Content will display here...',
      createdBy: '654a53fb1d79214f4ff03385',
      companyId: '151bdf53beeb02bc627d6804',
      createdAt: '2023-11-10T16:23:49.766Z',
      updatedAt: '2023-11-10T16:23:49.766Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
