import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDTO {
  @ApiProperty({ example: 'Purchase Cost' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: '5499.00' })
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({ example: '10/10/2022' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '651d8c552d3ef0d603ed4210' })
  @IsString()
  @IsNotEmpty()
  assetId: string;
}
