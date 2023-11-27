import { ApiProperty } from '@nestjs/swagger';
import { toMongoObjectId } from '@shared';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
export class ImportFileDTO {
  userId?: string;

  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  organizationId: string;

  @ApiProperty({
    type: String,
    example: 'https://s3/file.csv',
    required: true,
  })
  @IsNotEmpty()
  filePath: string;

  @ApiProperty({
    type: [String],
    example: ['amount', 'name'],
    required: true,
  })
  dataColumn: string[];

  @ApiProperty({
    type: String,
    example: 'Deals',
    required: true,
  })
  @IsNotEmpty()
  actionType: string;
}

export class ImportFileResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: ImportFileDTO,
  })
  data: ImportFileDTO;

  @ApiProperty({
    example: '',
  })
  error: string;
}
