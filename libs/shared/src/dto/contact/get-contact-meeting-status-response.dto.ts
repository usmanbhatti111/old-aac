import { ApiProperty } from '@nestjs/swagger';

export class GetContactMeetingStatusResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Meeting Status Get Successfully' })
  message: string;

  @ApiProperty({
    example: {
      totalCount: 2,
      totalUpcommingCount: 0,
      totalCompleteCount: 0,
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
