import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { ContactAssociationEnum } from '../../constants/enums';
export class GetContactAssociatinsDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  contactId: string;

  @ApiProperty({
    type: 'string',
    enum: ContactAssociationEnum,
    enumName: 'Contact association enum',
    required: true,
  })
  association_type: string;
}
