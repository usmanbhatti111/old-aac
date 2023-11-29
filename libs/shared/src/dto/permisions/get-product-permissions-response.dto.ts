import { ApiProperty } from '@nestjs/swagger';

export class GetProductPermissionsResponseDto {
    @ApiProperty({ example: 201 })
    statusCode: number;

    @ApiProperty({ example: 'Success' })
    message: string;

    @ApiProperty({
        example: [
            {
                "_id": "6565c738ca56d7eeced17ba2",
                "status": "ACTIVE",
                "productId": "6565c317550da1bcca625234",
                "slug": "service-dashboard-list",
                "name": "Dashboard list",
                "module": "Dashboard",
                "subModule": "Manage Dashboards",
                "createdAt": "2023-11-28T10:55:52.796Z",
                "updatedAt": "2023-11-28T10:55:52.796Z",
                "__v": 0
            },
            {
                "_id": "6565c738ca56d7eeced17ba7",
                "status": "ACTIVE",
                "productId": "6565c317550da1bcca625234",
                "slug": "service-create-dashboard",
                "name": "Create Dashboard ",
                "module": "Dashboard",
                "subModule": "Manage Dashboards",
                "createdAt": "2023-11-28T10:55:52.806Z",
                "updatedAt": "2023-11-28T10:55:52.806Z",
                "__v": 0
            },
            {
                "_id": "6565c738ca56d7eeced17bac",
                "status": "ACTIVE",
                "productId": "6565c317550da1bcca625234",
                "slug": "service-edit-dashboard",
                "name": "Edit Dashboard ",
                "module": "Dashboard",
                "subModule": "Manage Dashboards",
                "createdAt": "2023-11-28T10:55:52.817Z",
                "updatedAt": "2023-11-28T10:55:52.817Z",
                "__v": 0
            }
        ],
    })
    data: {};

    @ApiProperty({ example: null })
    errors: [];
}
