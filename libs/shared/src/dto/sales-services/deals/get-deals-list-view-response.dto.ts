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
          _id: '6539ef986198db6f5b96b699',
          name: 'Deal name',
          dealPiplineId: '6538bb480b3f9e9d83d4a2ce',
          DealStageId: '6538bb480b3f9e9d83d4a2ce',
          amount: 10000,
          closeDate: '2023-10-26T04:47:57.158Z',
          dealOwnerId: '6538bb480b3f9e9d83d4a2ce',
          priority: 'Low',
          addLineItemId: '6538bb480b3f9e9d83d4a2ce',
          billingFrequency: 'monthly',
          probability: 0,
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
          createdBy: '6539e749aa96470831c3343c',
          isDeleted: false,
          createdAt: '2023-10-26T04:48:24.468Z',
          updatedAt: '2023-10-26T04:48:24.468Z',
        },
        {
          _id: '6539e86a5dcfc436da36ebcb',
          name: 'Deal name',
          dealPiplineId: '6538bb480b3f9e9d83d4a2ce',
          DealStageId: '6538bb480b3f9e9d83d4a2ce',
          amount: 10000,
          closeDate: '2023-10-26T06:09:46.302Z',
          dealOwnerId: '6538bb480b3f9e9d83d4a2ce',
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
          createdBy: '6539e749aa96470831c3343c',
          isDeleted: false,
          createdAt: '2023-10-26T04:17:46.613Z',
          updatedAt: '2023-10-26T06:13:33.482Z',
          contactMode: 'email',
          contactedPersonId: '6538bb480b3f9e9d83d4a2ce',
          dealStageId: '653a036aff23036c9ad925a4',
          type: 'new business',
          updatedBy: '6539e749aa96470831c3343c',
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
