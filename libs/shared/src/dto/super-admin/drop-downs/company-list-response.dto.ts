import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetCompanyListDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  product: string;
}
