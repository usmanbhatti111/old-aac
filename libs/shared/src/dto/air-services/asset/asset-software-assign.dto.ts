import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssetsSoftwareAssignDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  categoryId: string;
}
