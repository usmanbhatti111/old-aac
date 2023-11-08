import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class IdDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  id: string;
}
