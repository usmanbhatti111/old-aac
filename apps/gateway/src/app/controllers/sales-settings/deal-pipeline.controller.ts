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
  CreateDealPipelineDto,
  DealPipelineResponseDto,
  DeleteDealPipelineDto,
  DeleteDealPipelineResponseDto,
  UpdateDealPipelineDto,
  GetDealPipelinesDto,
  DealPipelinesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEAL_PIPELINE)
@Controller(CONTROLLERS.DEAL_PIPELINE)
export class DealPipelineController {
  constructor(
    @Inject(SERVICES.SALES) private salesServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.DEAL_PIPELINE.CREATE_DEAL_PIPELINE)
  @ApiCreatedResponse({ type: DealPipelineResponseDto })
  public async addDealPipeline(
    @Req() request: AppRequest,
    @Body() payload: CreateDealPipelineDto
  ): Promise<DealPipelineResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_PIPELINE.CREATE_DEAL_PIPELINE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DEAL_PIPELINE.GET_DEAL_PIPELINES)
  @ApiOkResponse({ type: DealPipelinesResponseDto })
  public async getDealPipelines(
    @Req() request: AppRequest,
    @Query() payload: GetDealPipelinesDto
  ): Promise<DealPipelinesResponseDto> {
   
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_PIPELINE.GET_DEAL_PIPELINES,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.DEAL_PIPELINE.GET_DEAL_PIPELINE)
  @ApiOkResponse({ type: DealPipelineResponseDto })
  public async getDealPipeline(
    @Param() payload: IdDto
  ): Promise<DealPipelineResponseDto> {
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_PIPELINE.GET_DEAL_PIPELINE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.DEAL_PIPELINE.UPDATE_DEAL_PIPELINE)
  @ApiOkResponse({ type: DealPipelineResponseDto, })
  public async editContactStatus(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateDealPipelineDto
  ): Promise<DealPipelineResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_PIPELINE.UPDATE_DEAL_PIPELINE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.DEAL_PIPELINE.DELETE_DEAL_PIPELINE)
  @ApiOkResponse({ type: DeleteDealPipelineResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteDealPipelineDto
  ): Promise<DeleteDealPipelineResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_PIPELINE.DELETE_DEAL_PIPELINE,
        payload
      )
    );

    return response;
  }
}
