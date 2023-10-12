import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AccountListDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
