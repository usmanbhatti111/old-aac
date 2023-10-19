import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class EditFileDto {
  @ApiProperty({
    required: false,
    example: '651f8ef1ce48c8eb739ca5ae',
  })
  @IsOptional()
  folderId: string;

  @ApiProperty({
    required: false,
    example: 'my cv',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  incrementReadCount: boolean;

  @ApiProperty({
    required: false,
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  incrementSharedLinkCount: boolean;
  id: string;
  updatedBy?: string;
  updatedAt?: Date;
}
