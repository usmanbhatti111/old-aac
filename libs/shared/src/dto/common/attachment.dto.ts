import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiSingleFile } from '../../custom/api-single-file.decorator';
export class AttachmentDTO {
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  organizationAdminId: string;

  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  companyAdminId: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'pdf',
    required: false,
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'pdf',
    required: false,
  })
  serviceFeatureType: string;
  @ApiSingleFile()
  fileUrl: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  recordId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  moduleId: string;
}
