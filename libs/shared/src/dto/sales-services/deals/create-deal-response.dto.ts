import { ApiProperty } from '@nestjs/swagger';

export class CreateDealResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6539e86a5dcfc436da36ebcb',
      name: 'Deal name',
      dealPiplineId: '6538bb480b3f9e9d83d4a2ce',
      DealStageId: '6538bb480b3f9e9d83d4a2ce',
      amount: 10000,
      closeDate: '2023-10-26T04:16:06.567Z',
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
      createdAt: '2023-10-26T04:17:46.613Z',
      updatedAt: '2023-10-26T04:17:46.613Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
