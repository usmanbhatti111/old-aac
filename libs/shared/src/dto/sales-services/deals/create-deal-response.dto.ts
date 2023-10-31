import { ApiProperty } from '@nestjs/swagger';

export class CreateDealResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '653f38f781f49cda3cd33c7d',
      name: 'Deal name',
      dealPiplineId: '653b441c976aabdb035a6f8c',
      dealStageId: '653b445484125f0d1523e265',
      amount: 10000,
      closeDate: '2023-10-30T04:56:48.150Z',
      dealOwnerId: '653b47c4bb3e468fdf58c9ac',
      priority: 'Low',
      addLineItemId: '6538bb480b3f9e9d83d4a2ce',
      billingFrequency: 'monthly',
      probability: 20,
      activitiesIds: [],
      contactsIds: [],
      ticketsIds: [],
      companiesIds: [],
      productsIds: [],
      quotesIds: [],
      attachmentsIds: [],
      playbooksIds: [],
      tasksIds: [],
      notesIds: [],
      callsIds: [],
      emailsIds: [],
      meetingsIds: [],
      createdBy: '653b47c4bb3e468fdf58c9ac',
      isDeleted: 'ACTIVE',
      createdAt: '2023-10-30T05:02:47.030Z',
      updatedAt: '2023-10-30T05:02:47.030Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
