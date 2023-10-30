import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
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
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../shared/interface/request.interface';
import { Auth } from '../decorators/auth.decorator';
import { ApiFormData } from '@shared';

@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCTS)
@Controller(CONTROLLERS.PRODUCTS)
export class ProductsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.PRODUCTS.ADD_PRODUCT)
  @ApiCreatedResponse({ type: AddProductResponseDto })
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'file',
    fileTypes: ['jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  public async addProduct(
    @Req() request: AppRequest,
    @Body() payload: AddProductDto,
    @UploadedFile() file: any
  ): Promise<AddProductResponseDto> {
    payload.createdBy = request?.user?._id;
    payload.file = file;

    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.ADD_PRODUCT, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PRODUCTS.GET_PRODUCTS)
  @ApiOkResponse({ type: GetProductsResponseDto })
  public async getProducts(
    @Query() payload: GetProductsDto
  ): Promise<GetProductsResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.GET_PRODUCTS, payload)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PRODUCTS.EDIT_PRODUCT)
  @ApiOkResponse({ type: EditProductResponseDto })
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'file',
    fileTypes: ['jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  public async editProduct(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditProductDto,
    @UploadedFile() file: any
  ): Promise<EditProductResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;
    payload.file = file;

    const response = await firstValueFrom(
      this.superAdminService.send(RMQ_MESSAGES.PRODUCTS.EDIT_PRODUCT, payload)
    );

    return response;
  }
}
