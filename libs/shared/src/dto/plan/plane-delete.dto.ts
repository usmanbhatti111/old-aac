import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PlanDeleteDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  deletedBy: string;
}
