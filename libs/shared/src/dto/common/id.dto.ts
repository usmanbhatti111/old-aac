import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
