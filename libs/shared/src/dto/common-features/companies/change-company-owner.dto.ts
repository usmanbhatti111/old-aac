import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class ChangeCompanyOwnerDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    example: '655633c2d9d816a1a1cfbeb2',
    required: true,
  })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  ownerId: string;

  @Transform(toMongoObjectId)
  updatedBy: string;
}
