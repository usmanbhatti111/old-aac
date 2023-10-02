import { Body, Controller, Inject, Post, Res, Put, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    API_ENDPOINTS,
    API_TAGS,
    CONTROLLERS,
    RMQ_MESSAGES,
    SERVICES,
} from '@shared/constants';
import { CreateOrganizationDto, CreateOrganizationResponseDto } from '@shared/dto';
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
    public async createOrganization(@Body() payload: CreateOrganizationDto, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.CREATE_ORGANTIZATION }, payload)
        );

        return res.status(response.statusCode).json(response);
    }
    @Put(API_ENDPOINTS.ORGANIZATION.UPDATE_ORGANIZATION)
    public async updateOrganization(@Body() payload: CreateOrganizationDto, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.UPDATE_ORGANTIZATION }, payload)
        );

        return res.status(response.statusCode).json(response);
    }
    @Get(API_ENDPOINTS.ORGANIZATION.GET_ORGANIZATION + '/:id')
    @ApiParam({ name: 'id', type: String, description: 'Organization ID' })
    @ApiResponse({
        description: 'Successfully retrieved the organization',
        type: CreateOrganizationResponseDto,
    })
    public async getOrganization(@Param('id') id: string, @Res() res: Response | any) {
        const response = await firstValueFrom(
            this.organizationServiceClient.send({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATION }, { id })
        );

        return res.status(response.statusCode).json(response);
    }
}  