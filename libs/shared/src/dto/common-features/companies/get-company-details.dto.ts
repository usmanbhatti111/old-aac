import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class GetCompanyDetailsDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  id: string;
}
