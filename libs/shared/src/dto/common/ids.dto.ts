import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';

export class IdsDto {
  @ApiProperty({
    example: '56cb91bdc3464f14678934ca,56cb91bdc3464f14678934ca',
    description: 'use comma seperated values without space',
  })
  @IsString()
  @IsNotEmpty()
  ids: string;
}
