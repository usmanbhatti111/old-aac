import { Body, Controller, Inject, Post, Res, Put, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
    API_ENDPOINTS,
    API_TAGS,
    CONTROLLERS,
    RMQ_MESSAGES,
    SERVICES,
} from '@shared/constants';
import { CreateOrganizationDto, GetOrganizationDto, OrganizationResponseDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ORGANIZATION)
@Controller(CONTROLLERS.ORGANIZATION)
@ApiBearerAuth()
export class OrganizationController {
    constructor(
        @Inject(SERVICES.ORG_ADMIN) private organizationServiceClient: ClientProxy
    ) { }

    @Post(API_ENDPOINTS.ORGANIZATION.CREATE_ORGANIZATION)
    @ApiCreatedResponse({
        description: 'Successfully created an organization',
        type: OrganizationResponseDto,
    })
    public async createOrganization(@Body() payload: CreateOrganizationDto, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.CREATE_ORGANTIZATION }, payload)
        );

        return res.status(response.statusCode).json(response);
    }

    
    @Put(API_ENDPOINTS.ORGANIZATION.UPDATE_ORGANIZATION)
    @ApiOkResponse({
        description: 'Successfully updated the organization.',
        type: OrganizationResponseDto,
    })
    public async updateOrganization(@Param('id') id: string, @Body() payload: CreateOrganizationDto, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.UPDATE_ORGANTIZATION }, {id,...payload})
        );

        return res.status(response.statusCode).json(response);
    }

    @Get(API_ENDPOINTS.ORGANIZATION.GET_ORGANIZATION )
    @ApiOkResponse({
        description: 'Successfully retrieved the organization.',
        type: OrganizationResponseDto,
    })
    public async getOrganization(@Param() payload: GetOrganizationDto, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATION }, payload )
        );

        return res.status(response.statusCode).json(response);
    }
}  