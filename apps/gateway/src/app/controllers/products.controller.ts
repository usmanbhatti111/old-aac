import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
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
  AddProductDto,
  AddProductResponseDto,
  EditProductDto,
  EditProductResponseDto,
  GetProductsDto,
  GetProductsResponseDto,
  IdDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCTS)
@Controller(CONTROLLERS.PRODUCTS)
export class ProductsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.PRODUCTS.ADD_PRODUCT)
  @ApiCreatedResponse({ type: AddProductResponseDto })
  public async addProduct(
    @Body() payload: AddProductDto,
    @Res() res: Response | any
  ): Promise<AddProductResponseDto> {
    payload.modifiedBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.ADD_PRODUCT, payload)
    );

    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.PRODUCTS.GET_PRODUCTS)
  @ApiOkResponse({ type: GetProductsResponseDto })
  public async getProducts(
    @Query() payload: GetProductsDto,
    @Res() res: Response | any
  ): Promise<GetProductsResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.GET_PRODUCTS, payload)
    );

    return res.status(response.statusCode).json(response);
  }

  @Patch(API_ENDPOINTS.PRODUCTS.EDIT_PRODUCT)
  @ApiOkResponse({ type: EditProductResponseDto })
  public async editProduct(
    @Param() params: IdDto,
    @Body() payload: EditProductDto,
    @Res() res: Response | any
  ): Promise<EditProductResponseDto> {
    payload.modifiedBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    payload.id = params.id;
    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.EDIT_PRODUCT, payload)
    );

    return res.status(response.statusCode).json(response);
  }
}
