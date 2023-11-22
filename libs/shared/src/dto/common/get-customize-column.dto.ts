import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { ApiProperty } from '@nestjs/swagger';
import { ECustomizeColumnType } from '../../constants/enums';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetCustomizedColumns {
  @ApiProperty({
    type: String,
    required: true,
    enum: ECustomizeColumnType,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  type: string;

  @Transform(toMongoObjectId)
  userId: string;
}
