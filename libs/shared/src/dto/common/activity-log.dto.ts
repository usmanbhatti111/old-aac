import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetActivityLogDto extends PaginationDto {
  @ApiProperty({ example: '65152939f50394f42cee2db4', required: true })
  @IsMongoId()
  @IsNotEmpty()
  entityId: string;
}
