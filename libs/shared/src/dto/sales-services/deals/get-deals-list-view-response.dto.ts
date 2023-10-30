import { ApiProperty } from '@nestjs/swagger';

export class GetDealsListViewResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      deals: [
        {
          _id: '653b52a154d4b91f10f7e522',
          name: 'Test Deal 2',
          dealPiplineId: '653b441c976aabdb035a6f8c',
          dealStageId: '653b445484125f0d1523e264',
          amount: 10000,
          closeDate: '2023-10-27T03:17:07.995Z',
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
          isDeleted: false,
          createdAt: '2023-10-27T06:03:13.014Z',
          updatedAt: '2023-10-27T06:05:04.206Z',
          dealOwnerId: '653b47c4bb3e468fdf58c9ac',
          updatedBy: '653b47c4bb3e468fdf58c9ac',
          dealPipeline: 'Test pipline 1',
          dealStage: '',
          dealOwner: {
            _id: '653b47c4bb3e468fdf58c9ac',
            email: 'diannerussell@orgadmin.com',
            name: 'Dianne Russell',
          },
        },
        {
          _id: '653b48c5976aabdb035a6f8f',
          name: 'Test Deal 1',
          dealPiplineId: '653b441c976aabdb035a6f8c',
          dealStageId: '653b445484125f0d1523e265',
          amount: 10000,
          closeDate: '2023-10-27T03:17:07.995Z',
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
          isDeleted: false,
          createdAt: '2023-10-27T05:21:09.640Z',
          updatedAt: '2023-10-27T05:21:09.640Z',
          dealPipeline: 'Test pipline 1',
          dealStage: 'New',
          dealOwner: {
            _id: '653b47c4bb3e468fdf58c9ac',
            email: 'diannerussell@orgadmin.com',
            name: 'Dianne Russell',
          },
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
