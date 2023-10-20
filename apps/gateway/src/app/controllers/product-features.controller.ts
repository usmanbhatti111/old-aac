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
  AddProductFeatureDto,
  AddProductFeatureResponseDto,
  AddProductResponseDto,
  DeleteProductFeaturesDto,
  DeleteProductFeaturesResponseDto,
  EditProductFeatureDto,
  EditProductFeatureResponseDto,
  GetProductFeatureResponseDto,
  GetProductsFeaturesDto,
  GetProductsFeaturesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../decorators/auth.decorator';
import { AppRequest } from '../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCT_FEATURES)
@Controller(CONTROLLERS.PRODUCT_FEATURES)
export class ProductFeaturesController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.PRODUCT_FEATURES.ADD_PRODUCT_FEATURE)
  @ApiCreatedResponse({ type: AddProductFeatureResponseDto })
  public async addProduct(
    @Req() request: AppRequest,
    @Body() payload: AddProductFeatureDto
  ): Promise<AddProductResponseDto> {
    payload.createdBy = request?.user?._id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.ADD_PRODUCT_FEATURE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PRODUCT_FEATURES.GET_PRODUCTS_FEATURES)
  @ApiOkResponse({ type: GetProductsFeaturesResponseDto })
  public async getProductsFeatures(
    @Query() payload: GetProductsFeaturesDto
  ): Promise<GetProductsFeaturesResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.GET_PRODUCTS_FEATURES,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PRODUCT_FEATURES.GET_PRODUCT_FEATURE)
  @ApiOkResponse({ type: GetProductFeatureResponseDto })
  public async getProductFeature(
    @Param() payload: IdDto
  ): Promise<GetProductFeatureResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.GET_PRODUCT_FEATURE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PRODUCT_FEATURES.EDIT_PRODUCT_FEATURE)
  @ApiOkResponse({ type: EditProductFeatureResponseDto })
  public async editProductFeature(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditProductFeatureDto
  ): Promise<EditProductFeatureResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.EDIT_PRODUCT_FEATURE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.PRODUCT_FEATURES.DELETE_PRODUCTS_FEATURES)
  @ApiOkResponse({ type: DeleteProductFeaturesResponseDto })
  public async deleteProductFeature(
    @Req() request: AppRequest,
    @Param() payload: DeleteProductFeaturesDto
  ): Promise<DeleteProductFeaturesResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.DELETE_PRODUCTS_FEATURES,
        payload
      )
    );

    return response;
  }
}
