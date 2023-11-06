import { ApiProperty } from '@nestjs/swagger';

export class SoftwareContractResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: ' Contract Allocated Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '653fa7cafe68046f0c509204',
      userRefId: '653910f35a081f1e3067c6d5',
      softwareId: '6539142dc58046d9d95376f4',
      userId: '653910f35a081f1e3067c6d5',
      createdAt: '2023-10-30T12:55:38.931Z',
      updatedAt: '2023-10-30T13:17:04.400Z',
      contractId: '6539144fc58046d9d95376f6',
      isContractAllocated: true,
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
