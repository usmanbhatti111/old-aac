import { ApiProperty } from '@nestjs/swagger';
import { EDealViewSharedWith } from '@shared/constants';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class CreateDealViewDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'My October View',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example:
      '/deals/get-deals-list-view?dateStart=2023-10-01&dateEnd=2023-10-31',
  })
  @IsNotEmpty()
  @IsString()
  apiUrl: string;

  @ApiProperty({
    type: String,
    enum: EDealViewSharedWith,
    example: EDealViewSharedWith.PRIVATE,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  sharedWith: string;

  @ApiProperty({
    example: '56cb91bdc3464f14678934ca',
    required: false,
    description:
      'This field is required if you select sharedWith type = MY_TEAM',
  })
  @ValidateIf((dto) => dto.sharedWith === EDealViewSharedWith.MY_TEAM)
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  // @IsOptional()
  teamId?: string;

  @Transform(toMongoObjectId)
  createdBy?: string;
}
