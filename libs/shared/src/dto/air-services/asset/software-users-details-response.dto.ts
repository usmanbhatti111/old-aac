import { ApiProperty } from '@nestjs/swagger';

export class SoftwareUsersDetailsResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: ' Software Users Get Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      softwareusers: [
        {
          _id: '653a68a180b4224820140b77',
          userRefId: '653910f35a081f1e3067c6d5',
          softwareId: '6539142dc58046d9d95376f4',
          contractId: '6539144fc58046d9d95376f6',
          userId: '653910f35a081f1e3067c6d5',
          isContractAllocated: true,
          createdAt: '2023-10-26T13:24:49.398Z',
          updatedAt: '2023-10-26T13:24:49.398Z',
          details: {
            _id: '653910f35a081f1e3067c6d5',
            firstName: 'string',
            lastName: 'string',
            email: 'Shoaib1115@example.com',
            phoneNumber: '+44 2388 2399',
            cognitoId: 'e3caf412-b212-480f-bdf3-0a407076179d',
            role: 'ORG_ADMIN',
            products: [],
            createdBy: null,
            createdAt: '2023-10-25T12:58:27.304Z',
            updatedAt: '2023-10-25T12:58:27.304Z',
          },
          contracts: {
            _id: '6539144fc58046d9d95376f6',
            name: 'contract name',
            type: '651d72b06c9932a97b031a34',
            cost: '200',
            startDate: '2023-10-25T00:00:00.000Z',
            endDate: '2024-10-25T00:00:00.000Z',
            contractNumber: 'CNTW-6',
            attachments: ['652ee528da86b788fd6ca7ea'],
            status: 'DRAFT',
            vendor: '651d72b06c9932a97b031a34',
            approver: '651d72b06c9932a97b031a34',
            autoRenew: false,
            notifyExpiry: true,
            statusRenewExtend: null,
            assetId: '652ee528da86b788fd6ca7ea',
            isDeleted: false,
            createdAt: '2023-10-25T13:12:47.837Z',
            updatedAt: '2023-10-25T13:12:47.837Z',
          },
        },
        {
          _id: '653923ce7a667658592987c3',
          userRefId: '653910f35a081f1e3067c6d5',
          softwareId: '6539142dc58046d9d95376f4',
          contractId: '6539144fc58046d9d95376f6',
          userId: '653910f35a081f1e3067c6d5',
          isContractAllocated: true,
          createdAt: '2023-10-25T14:18:54.970Z',
          updatedAt: '2023-10-25T14:18:54.970Z',
          details: {
            _id: '653910f35a081f1e3067c6d5',
            firstName: 'string',
            lastName: 'string',
            email: 'Shoaib1115@example.com',
            phoneNumber: '+44 2388 2399',
            cognitoId: 'e3caf412-b212-480f-bdf3-0a407076179d',
            role: 'ORG_ADMIN',
            products: [],
            createdBy: null,
            createdAt: '2023-10-25T12:58:27.304Z',
            updatedAt: '2023-10-25T12:58:27.304Z',
          },
          contracts: {
            _id: '6539144fc58046d9d95376f6',
            name: 'contract name',
            type: '651d72b06c9932a97b031a34',
            cost: '200',
            startDate: '2023-10-25T00:00:00.000Z',
            endDate: '2024-10-25T00:00:00.000Z',
            contractNumber: 'CNTW-6',
            attachments: ['652ee528da86b788fd6ca7ea'],
            status: 'DRAFT',
            vendor: '651d72b06c9932a97b031a34',
            approver: '651d72b06c9932a97b031a34',
            autoRenew: false,
            notifyExpiry: true,
            statusRenewExtend: null,
            assetId: '652ee528da86b788fd6ca7ea',
            isDeleted: false,
            createdAt: '2023-10-25T13:12:47.837Z',
            updatedAt: '2023-10-25T13:12:47.837Z',
          },
        },
        {
          _id: '653914a8c58046d9d95376f8',
          userRefId: '653910f35a081f1e3067c6d5',
          softwareId: '6539142dc58046d9d95376f4',
          contractId: '6539144fc58046d9d95376f6',
          userId: '653910f35a081f1e3067c6d5',
          isContractAllocated: true,
          createdAt: '2023-10-25T13:14:16.150Z',
          updatedAt: '2023-10-25T13:14:16.150Z',
          details: {
            _id: '653910f35a081f1e3067c6d5',
            firstName: 'string',
            lastName: 'string',
            email: 'Shoaib1115@example.com',
            phoneNumber: '+44 2388 2399',
            cognitoId: 'e3caf412-b212-480f-bdf3-0a407076179d',
            role: 'ORG_ADMIN',
            products: [],
            createdBy: null,
            createdAt: '2023-10-25T12:58:27.304Z',
            updatedAt: '2023-10-25T12:58:27.304Z',
          },
          contracts: {
            _id: '6539144fc58046d9d95376f6',
            name: 'contract name',
            type: '651d72b06c9932a97b031a34',
            cost: '200',
            startDate: '2023-10-25T00:00:00.000Z',
            endDate: '2024-10-25T00:00:00.000Z',
            contractNumber: 'CNTW-6',
            attachments: ['652ee528da86b788fd6ca7ea'],
            status: 'DRAFT',
            vendor: '651d72b06c9932a97b031a34',
            approver: '651d72b06c9932a97b031a34',
            autoRenew: false,
            notifyExpiry: true,
            statusRenewExtend: null,
            assetId: '652ee528da86b788fd6ca7ea',
            isDeleted: false,
            createdAt: '2023-10-25T13:12:47.837Z',
            updatedAt: '2023-10-25T13:12:47.837Z',
          },
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 3,
      },
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
