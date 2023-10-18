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
  AddProductCategoryDto,
  AddProductCategoryResponseDto,
  EditProductCategoryDto,
  EditProductCategoryResponseDto,
  GetProductCategoriesDto,
  GetProductCategoriesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCT_CATEGORIES)
@Controller(CONTROLLERS.PRODUCT_CATEGORIES)
export class ProductCategoriesController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN)
    private orgAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.PRODUCT_CATEGORIES.ADD_PRODUCT_CATEGORY)
  @ApiCreatedResponse({ type: AddProductCategoryResponseDto })
  public async addProductCategory(
    @Req() request: AppRequest,
    @Body() payload: AddProductCategoryDto
  ): Promise<AddProductCategoryResponseDto> {
    payload.createdBy = request?.user?._id;
    const response = await firstValueFrom(
      this.orgAdminService.send(
        RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.ADD_PRODUCT_CATEGORY,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PRODUCT_CATEGORIES.GET_PRODUCT_CATEGORIES)
  @ApiOkResponse({ type: GetProductCategoriesResponseDto })
  public async getProductsFeatures(
    @Req() request: AppRequest,
    @Query() payload: GetProductCategoriesDto
  ): Promise<GetProductCategoriesResponseDto> {
    payload.userId = request?.user?._id; // get product categories related to specific organization

    const response = await firstValueFrom(
      this.orgAdminService.send(
        RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.GET_PRODUCT_CATEGORIES,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PRODUCT_CATEGORIES.EDIT_PRODUCT_CATEGORY)
  @ApiOkResponse({ type: EditProductCategoryResponseDto })
  public async editProductCategory(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditProductCategoryDto
  ): Promise<EditProductCategoryResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.orgAdminService.send(
        RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.EDIT_PRODUCT_CATEGORY,
        payload
      )
    );

    return response;
  }
}
