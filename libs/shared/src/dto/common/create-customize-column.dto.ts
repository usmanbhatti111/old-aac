import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';
import { ECustomizeColumnType } from '../../constants/enums';

export class CustomizeColumnsObject {
  slug: string;
  attributes: string;
  active?: boolean;
  order: number;
}

export class CreateCustomizeColumnDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '56cb91bdc3464f14678934ca',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  userId?: string;

  @ApiProperty({
    type: String,
    enum: ECustomizeColumnType,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    type: [CustomizeColumnsObject],
    isArray: true,
    example: [
      {
        slug: 'Deal Owner',
        attributes: 'dealOwner.name email profileImage',
        active: true,
        order: 1,
      },
      {
        slug: 'Deal Name',
        attributes: 'name',
        active: true,
        order: 2,
      },
      {
        slug: 'Contacted Person',
        attributes:
          'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
        active: false,
        order: 3,
      },
      {
        slug: 'Priority',
        attributes: 'priority',
        active: false,
        order: 4,
      },
      {
        slug: 'Created Date',
        attributes: 'createdAt',
        active: false,
        order: 5,
      },
      {
        slug: 'Close Date',
        attributes: 'createdAt',
        active: false,
        order: 6,
      },
      {
        slug: 'Deal Stage',
        attributes: 'dealStage',
        active: true,
        order: 7,
      },
      {
        slug: 'Deal Pipeline',
        attributes: 'dealPipeline',
        active: true,
        order: 8,
      },
      {
        slug: 'Amount',
        attributes: 'amount',
        active: true,
        order: 9,
      },
    ],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  columns: CustomizeColumnsObject[];
}
