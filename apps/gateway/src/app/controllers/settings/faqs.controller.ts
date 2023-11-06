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
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateFaqDto,
  CreateFaqResponseDto,
  DeleteFaqsDto,
  DeleteFaqsResponseDto,
  GetFaqResponseDto,
  GetFaqsDto,
  GetFaqsResponseDto,
  IdDto,
  UpdateFaqDto,
  UpdateFaqResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.FAQS)
@Controller(CONTROLLERS.FAQS)
@ApiBearerAuth()
export class FaqsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private faqServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.FAQS.CREATE_FAQ)
  @ApiCreatedResponse({ type: CreateFaqResponseDto })
  public async createFaq(
    @Req() request: AppRequest,
    @Body() payload: CreateFaqDto
  ) {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.CREATE_FAQ }, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.FAQS.GET_FAQ)
  @ApiOkResponse({ type: GetFaqResponseDto })
  public async getFaq(@Param() payload: IdDto) {
    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.GET_FAQ }, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.FAQS.GET_FAQS)
  @ApiCreatedResponse({ type: GetFaqsResponseDto })
  public async getFaqs(@Query() payload: GetFaqsDto) {
    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.GET_FAQS }, payload)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.FAQS.UPDATE_FAQ)
  @ApiOkResponse({ type: UpdateFaqResponseDto })
  public async updateFaq(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateFaqDto
  ) {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.UPDATE_FAQ }, payload)
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.FAQS.DELETE_FAQ)
  @ApiOkResponse({ type: DeleteFaqsResponseDto })
  public async deleteFaq(
    @Req() request: AppRequest,
    @Param() payload: DeleteFaqsDto
  ) {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.DELETE_FAQ }, payload)
    );

    return response;
  }
}
