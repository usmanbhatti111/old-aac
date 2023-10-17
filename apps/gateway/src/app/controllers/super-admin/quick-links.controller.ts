import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddQuickLinkDto,
  AddQuickLinkResponseDto,
  DeleteQuickLinksDto,
  DeleteQuickLinksResponseDto,
  EditQuickLinkDto,
  EditQuickLinkResponseDto,
  GetQuickLinksDto,
  GetQuickLinksGroupByProductResponseDto,
  GetQuickLinksResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import { Auth } from '../../decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags(API_TAGS.QUICK_LINKS)
@Controller(CONTROLLERS.QUICK_LINKS)
export class QuickLinksController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SUPER_ADMIN.QUICK_LINKS.ADD_QUICK_LINK)
  @ApiCreatedResponse({ type: AddQuickLinkResponseDto })
  public async addProduct(
    @Req() request: AppRequest,
    @Body() payload: AddQuickLinkDto
  ): Promise<AddQuickLinkResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.ADD_QUICK_LINK,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS_GROUP_BY_PRODUCT)
  @ApiOkResponse({ type: GetQuickLinksGroupByProductResponseDto })
  public async getQuickLinksGroupByProduct(): Promise<GetQuickLinksGroupByProductResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS_GROUP_BY_PRODUCT,
        {}
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS)
  @ApiOkResponse({ type: GetQuickLinksResponseDto })
  public async getQuickLinks(
    @Query() payload: GetQuickLinksDto
  ): Promise<AddQuickLinkResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS,
        payload
      )
    );

    return response;
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.QUICK_LINKS.EDIT_QUICK_LINK)
  @ApiOkResponse({ type: EditQuickLinkResponseDto })
  public async editQuickLinks(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditQuickLinkDto
  ): Promise<EditQuickLinkResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.EDIT_QUICK_LINK,
        payload
      )
    );

    return response;
  }

  @Delete(API_ENDPOINTS.SUPER_ADMIN.QUICK_LINKS.DELETE_QUICK_LINKS)
  @ApiOkResponse({ type: DeleteQuickLinksResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteQuickLinksDto
  ): Promise<DeleteQuickLinksResponseDto> {
    payload.deletedBy = request?.user?._id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.DELETE_QUICK_LINKS,
        payload
      )
    );

    return response;
  }
}
