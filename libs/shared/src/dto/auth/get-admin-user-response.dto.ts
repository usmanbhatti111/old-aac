import { ApiProperty } from '@nestjs/swagger';

export class GetAdminUserListResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Data Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '6544c532ec1548e3f94c9f4d',
        firstName: 'BP  INC',
        middleName: 'ESTATES',
        lastName: 'INC',
        role: 'ORG_ADMIN',
        status: 'INACTIVE',
        products: ['6544c532ec1548e3f94c9f4d', '6544c532ec1548e3f94c9f4d'],
        organization: [
          {
            _id: '6544c532ec1548e3f94c9f4b',
            crn: 'OE017951',
            name: 'BP ESTATES INC',
            address: {
              street:
                'Ave. Aquilino De La Guardia 50th Street, Plaza Banco General Building, 24th Floor',
              city: 'Panama',
              state: 'Panama',
            },
            isDeleted: false,
            createdAt: '2023-11-03T10:02:26.860Z',
            updatedAt: '2023-11-03T10:02:26.860Z',
          },
        ],
        createdAt: '2023-11-03T10:02:26.870Z',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
