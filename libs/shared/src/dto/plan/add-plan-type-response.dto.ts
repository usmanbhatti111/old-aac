import { ApiProperty } from '@nestjs/swagger';

export class AddPlanTypeResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Plan type added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65265060b3f1860c66c7adce',
      name: 'some name',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
