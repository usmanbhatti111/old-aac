import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class CompanyAccountRoleFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  organizationCompanyAccountId: string;

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
