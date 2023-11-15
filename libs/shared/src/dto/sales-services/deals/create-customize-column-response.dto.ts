import { ApiProperty } from '@nestjs/swagger';

export class CreateDealCuztomizeColumnResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '655462e69504c030d3724e94',
      userId: '653b47c4bb3e468fdf58c9ac',
      type: 'deals',
      isDeleted: false,
      columns: [
        {
          slug: 'Deal Owner',
          attributes: 'dealOwner.name email profileImage',
          active: true,
          order: 1,
        },
        {
          slug: 'Deal Name',
          attributes: 'name',
          active: true,
          order: 2,
        },
        {
          slug: 'Contacted Person',
          attributes:
            'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
          active: false,
          order: 3,
        },
        {
          slug: 'Priority',
          attributes: 'priority',
          active: false,
          order: 4,
        },
        {
          slug: 'Created Date',
          attributes: 'createdAt',
          active: false,
          order: 5,
        },
        {
          slug: 'Close Date',
          attributes: 'createdAt',
          active: false,
          order: 6,
        },
        {
          slug: 'Deal Stage',
          attributes: 'dealStage',
          active: true,
          order: 7,
        },
        {
          slug: 'Deal Pipeline',
          attributes: 'dealPipeline',
          active: true,
          order: 8,
        },
        {
          slug: 'Amount',
          attributes: 'amount',
          active: true,
          order: 9,
        },
      ],
      createdAt: '2023-11-15T06:19:18.907Z',
      updatedAt: '2023-11-15T06:19:18.907Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
