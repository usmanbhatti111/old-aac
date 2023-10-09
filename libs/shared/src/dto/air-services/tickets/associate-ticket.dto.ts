import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '../../common';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class AssociateAssetsDTO extends IdDto {
  @ApiProperty({
    type: [String],
    required: true,
    example: ['651d72b06c9932a97b031a34'],
  })
  @ArrayNotEmpty()
  assetIds: string[];
}
