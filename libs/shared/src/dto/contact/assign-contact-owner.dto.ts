import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class AssignContactOwnerDto {
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactOwnerId: string;

  contactId: string;

  updatedBy: string;
}
