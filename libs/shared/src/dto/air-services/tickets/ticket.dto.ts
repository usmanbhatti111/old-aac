import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  IsString,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import {
  EPurchaseOrderStatus,
  EApprovalStatusStatus,
} from '../../../constants/enums';

export class TicketIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty({
    type: [String],
    example: ['652ffb62436eb52662f9752e', '652ffb69436eb52662f97534'],
    required: false,
  })
  Ids: [string];

  companyId?: string;
}
