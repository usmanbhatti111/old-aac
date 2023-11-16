import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import { GetAllDropdownResponseDto, GetAllSearchDTO } from '@shared/dto';

@ApiTags(API_TAGS.DROPDOWNS)
@Controller(CONTROLLERS.DROPDOWN)
export class DropdownController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.DROPDOWNS.ORGANIZATION_DROPDOWN)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getallOrganizations(
    @Query() q: GetAllSearchDTO,
    @Req() request: AppRequest
  ): Promise<GetAllDropdownResponseDto> {
    const { user } = request;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.DROPDOWNS.ORGANIZATIONS_DROPDOWN },
        {
          q: q?.q,

          userId: user?._id,
        }
      )
    );
    return response;
  }

  @Get(API_ENDPOINTS.DROPDOWNS.PRODUCTS_DROPDOWN)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getallProducts(
    @Query() q: GetAllSearchDTO,
    @Req() request: AppRequest
  ): Promise<GetAllDropdownResponseDto> {
    const { user } = request;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.DROPDOWNS.PRODUCTS_DROPDOWN },
        { q: q?.q, userId: user?._id }
      )
    );
    return response;
  }
}
