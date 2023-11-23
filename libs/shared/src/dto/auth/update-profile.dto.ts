import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiSingleFile } from '../../custom';
import { toMongoObjectId } from '../../functions';

export class UpdateProfileDto {
  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    uniqueItems: true,
    required: false,
    example: '',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: Object,
    example: {
      flatNumber: 'string', // alt: unit
      buildingName: 'string',
      buildingNumber: 'string',
      streetName: 'string',
      city: 'string', // alt: town
      country: 'string',
      composite: 'string',
    },
  })
  @IsOptional()
  address?: {};

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  postCode?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  facebookUrl?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  twitterUrl?: string;

  userId: string;
}

export class UpdateAvatarDto {
  @ApiSingleFile({ required: false })
  @IsOptional()
  avatar: any;

  userId: string;

  removeAvatar: boolean;
}

export class UpdateAvatarQueryDto {
  @ApiProperty({
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  removeAvatar: boolean;
}

export class UpdateAvatarParamDto {
  @ApiProperty({
    required: false,
    description: 'Example: 652627f809a15759b979dd3a',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  id: string;
}
