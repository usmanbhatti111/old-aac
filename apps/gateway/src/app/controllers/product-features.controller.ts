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
  DeleteProductFeaturesResponseDto,
  EditProductFeatureDto,
  EditProductFeatureResponseDto,
  GetProductFeatureResponseDto,
  GetProductsFeaturesDto,
  GetProductsFeaturesResponseDto,
  IdDto,
  IdsDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCT_FEATURES)
@Controller(CONTROLLERS.PRODUCT_FEATURES)
export class ProductFeaturesController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.PRODUCT_FEATURES.ADD_PRODUCT_FEATURE)
  @ApiCreatedResponse({ type: AddProductFeatureResponseDto })
  public async addProduct(
    @Body() payload: AddProductFeatureDto
  ): Promise<AddProductResponseDto> {
    payload.createdBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.ADD_PRODUCT_FEATURE,
        payload
      )
    );

    return response;
  }

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

  @Patch(API_ENDPOINTS.PRODUCT_FEATURES.EDIT_PRODUCT_FEATURE)
  @ApiOkResponse({ type: EditProductFeatureResponseDto })
  public async editProductFeature(
    @Param() params: IdDto,
    @Body() payload: EditProductFeatureDto
  ): Promise<EditProductFeatureResponseDto> {
    payload.modifiedBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    payload.id = params.id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.EDIT_PRODUCT_FEATURE,
        payload
      )
    );

    return response;
  }

  @Delete(API_ENDPOINTS.PRODUCT_FEATURES.DELETE_PRODUCTS_FEATURES)
  @ApiOkResponse({ type: DeleteProductFeaturesResponseDto })
  public async deleteProductFeature(
    @Param() payload: IdsDto
  ): Promise<DeleteProductFeaturesResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PRODUCT_FEATURES.DELETE_PRODUCTS_FEATURES,
        payload
      )
    );

    return response;
  }
}
