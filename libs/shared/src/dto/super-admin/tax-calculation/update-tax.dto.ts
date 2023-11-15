import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AddTaxDto } from './add-tax.dto';
import { EStatusToggle } from '@shared/constants';
import { toMongoObjectId } from 'libs/shared/src/functions';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaxDto extends PartialType(
  OmitType(AddTaxDto, ['createdBy'] as const)
) {
  @ApiProperty({
    type: String,
    enum: EStatusToggle,
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
