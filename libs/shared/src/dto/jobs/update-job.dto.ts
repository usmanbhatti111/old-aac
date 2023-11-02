import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EJobStatus } from '../../constants/enums';
import { toMongoObjectId } from '../../functions';
import { CreateJobDto } from './create.job.dto';

export class UpdateJobDto extends PartialType(
  OmitType(CreateJobDto, ['createdBy'] as const)
) {
  @ApiProperty({
    type: String,
    enum: EJobStatus,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  status: string;

  @Transform(toMongoObjectId)
  updatedBy: string;

  id: string;
}
