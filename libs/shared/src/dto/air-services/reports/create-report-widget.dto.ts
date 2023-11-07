import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateReportWidgettDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Object,
    required: true,
    example: {
      chartType: 'Bar',
    },
  })
  @IsObject()
  chartConfig: Object;

  @ApiProperty({
    type: Object,
    required: false,
    example: {
      documentName: 'Tickets',
    },
  })
  @IsObject()
  @IsNotEmpty()
  queryFiltersData: Object;
}
