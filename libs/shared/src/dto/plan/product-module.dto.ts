import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  moduleId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  modulePermissionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
}
