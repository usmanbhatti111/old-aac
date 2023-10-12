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
