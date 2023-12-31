import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiSingleFile } from 'libs/shared/src/custom';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class CreateJobApplicationDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '6538ef8cb3658ab4641fb188',
  })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  jobId: string;

  @ApiSingleFile({ required: false })
  @IsOptional()
  resume: any;

  @ApiSingleFile({ required: false })
  @IsOptional()
  coverLetter: any;

  @Transform(toMongoObjectId)
  createdBy: string;

  files: any;
}
