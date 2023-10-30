import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'Azskj23........340.sdZss',
  })
  @IsNotEmpty()
  token: string;
}

export class CompanyHouseSearchQueryDto {
  @ApiProperty({
    example: 'crn',
    enum: ['name', 'crn'],
    required: true,
  })
  @IsNotEmpty()
  by: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  q: string;
}
