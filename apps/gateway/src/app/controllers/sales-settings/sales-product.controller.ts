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
  CreateSalesProductDto,
  SalesProductResponseDto,
  DeleteSalesProductDto,
  DeleteSalesProductResponseDto,
  UpdateSalesProductDto,
  GetSalesProductsDto,
  SalesProductsResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.SALES_PRODUCT)
@Controller(CONTROLLERS.SALES_PRODUCT)
export class SalesProductController {
  constructor(
    @Inject(SERVICES.SALES) private salesServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SALES_PRODUCT.CREATE_SALES_PRODUCT)
  @ApiCreatedResponse({ type: SalesProductResponseDto })
  public async addSalesProduct(
    @Req() request: AppRequest,
    @Body() payload: CreateSalesProductDto
  ): Promise<SalesProductResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.SALES_PRODUCT.CREATE_SALES_PRODUCT,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES_PRODUCT.GET_SALES_PRODUCTS)
  @ApiOkResponse({ type: SalesProductsResponseDto })
  public async getSalesProducts(
    @Req() request: AppRequest,
    @Query() payload: GetSalesProductsDto
  ): Promise<SalesProductsResponseDto> {
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.SALES_PRODUCT.GET_SALES_PRODUCTS,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SALES_PRODUCT.GET_SALES_PRODUCT)
  @ApiOkResponse({ type: SalesProductResponseDto })
  public async getSalesProduct(
    @Param() payload: IdDto
  ): Promise<SalesProductResponseDto> {
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.SALES_PRODUCT.GET_SALES_PRODUCT,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES_PRODUCT.UPDATE_SALES_PRODUCT)
  @ApiOkResponse({ type: SalesProductResponseDto })
  public async editContactStatus(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateSalesProductDto
  ): Promise<SalesProductResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.SALES_PRODUCT.UPDATE_SALES_PRODUCT,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.SALES_PRODUCT.DELETE_SALES_PRODUCT)
  @ApiOkResponse({ type: DeleteSalesProductResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteSalesProductDto
  ): Promise<DeleteSalesProductResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.SALES_PRODUCT.DELETE_SALES_PRODUCT,
        payload
      )
    );

    return response;
  }
}
