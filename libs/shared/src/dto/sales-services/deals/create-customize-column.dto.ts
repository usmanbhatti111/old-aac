import { ApiProperty } from '@nestjs/swagger';
import { ECustomizeColumnType } from '@shared/constants';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';
import { CustomizeColumnsObject } from '../../common';

export class CreateDealCuztomizeColumnDto {
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

  @Transform(toMongoObjectId)
  userId?: string;
}
