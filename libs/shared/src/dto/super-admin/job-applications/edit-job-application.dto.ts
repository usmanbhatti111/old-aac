import { ApiProperty } from '@nestjs/swagger';
import { EApplicationStatus } from '@shared/constants';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class EditJobApplicationsDto {
  @ApiProperty({
    type: String,
    required: false,
    enum: EApplicationStatus,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  @Transform(toMongoObjectId)
  id: string;

  @Transform(toMongoObjectId)
  updatedBy: string;
}
