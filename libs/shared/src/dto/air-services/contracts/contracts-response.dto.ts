import { ApiProperty } from '@nestjs/swagger';

export class SubmittedContractRequestResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: ' Contract has sent for Approval ',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '65390abf30af14d3b1ac32ef',
      name: 'contract name',
      type: '651d72b06c9932a97b031a34',
      cost: '200',
      startDate: '2023-10-25T00:00:00.000Z',
      endDate: '2024-10-25T00:00:00.000Z',
      contractNumber: 'CNTW-6',
      attachments: ['652ee528da86b788fd6ca7ea'],
      status: 'PENDING_APPROVAL',
      vendor: '651d72b06c9932a97b031a34',
      approver: '651d72b06c9932a97b031a34',
      autoRenew: false,
      notifyExpiry: true,
      statusRenewExtend: null,
      assetId: '652ee528da86b788fd6ca7ea',
      isDeleted: false,
      createdAt: '2023-10-25T12:31:59.728Z',
      updatedAt: '2023-11-01T14:15:44.497Z',
      isSubmitted: true,
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}

export class ApprovedContractResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: ' Contract approved successfully ',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '65390abf30af14d3b1ac32ef',
      name: 'contract name',
      type: '651d72b06c9932a97b031a34',
      cost: '200',
      startDate: '2023-10-25T00:00:00.000Z',
      endDate: '2024-10-25T00:00:00.000Z',
      contractNumber: 'CNTW-6',
      attachments: ['652ee528da86b788fd6ca7ea'],
      status: 'APPROVED',
      vendor: '651d72b06c9932a97b031a34',
      approver: '651d72b06c9932a97b031a34',
      autoRenew: false,
      notifyExpiry: true,
      statusRenewExtend: null,
      assetId: '652ee528da86b788fd6ca7ea',
      isDeleted: false,
      createdAt: '2023-10-25T12:31:59.728Z',
      updatedAt: '2023-11-01T14:15:44.497Z',
      isSubmitted: true,
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
