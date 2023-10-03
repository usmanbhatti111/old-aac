import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  module_id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  module_permission_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;
}
