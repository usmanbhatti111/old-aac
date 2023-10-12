import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AccountDetailResponseDto,
  AccountListDto,
  AddAccountDto,
  AddAccountResponseDto,
  AddUserDto,
  AddUserResponseDto,
  GetAccountlistResponseDto,
  GetCompanyListDto,
  GetProductsResponseDto,
  GetUserDto,
  GetUserslistResponseDto,
  UpdateAccountDto,
  UpdateAccountResponseDto,
  UpdateProfileResponseDto,
  UpdateUserDto,
  UserProfileResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.SUPER_ADMIN)
@Controller(CONTROLLERS.SUPER_ADMIN)
@Injectable()
export class SuperAdminController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.SUPER_ADMIN.ADD_USER)
  @ApiOperation({ summary: 'Add user by Org-admin' })
  @ApiOkResponse({ type: AddUserResponseDto })
  public async addUser(@Body() payload: AddUserDto): Promise<AddAccountDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.ADD_USER, {
        payload,
      })
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.USER_LIST)
  @ApiOperation({ summary: 'User list' })
  @ApiOkResponse({ type: GetUserslistResponseDto })
  public async userList(
    @Query() query: GetUserDto
  ): Promise<GetUserslistResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.USER_LIST, {
        query,
      })
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.USER_PROFILE)
  @ApiOperation({ summary: 'User profile' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public async userProfile(
    @Param('userId') userId: string
  ): Promise<UserProfileResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.USER_PROFILE, {
        userId,
      })
    );
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.UPDATE_PROFILE)
  @ApiOperation({ summary: 'Update user profile by Org-Admin' })
  @ApiOkResponse({ type: UpdateProfileResponseDto })
  public async updateProfile(
    @Body() payload: UpdateUserDto,
    @Param('userId') userId: string
  ): Promise<UpdateProfileResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.UPDATE_PROFILE,
        { userId, payload }
      )
    );
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.ADD_ACCOUNTS)
  @ApiOperation({ summary: 'Add user account by Org-Admin' })
  @ApiOkResponse({ type: AddAccountResponseDto })
  public async addAccounts(
    @Body() payload: AddAccountDto
  ): Promise<AddAccountResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.ADD_ACCOUNTS, {
        payload,
      })
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.ACCOUNTS_LIST)
  @ApiOperation({ summary: 'Use Accounts list' })
  @ApiOkResponse({ type: GetAccountlistResponseDto })
  public async accountList(
    @Query() query: AccountListDto
  ): Promise<GetAccountlistResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ACCOUNTS_LIST,
        {
          query,
        }
      )
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.ACCOUNT_DETAIL)
  @ApiOperation({ summary: 'Account Detail' })
  @ApiOkResponse({ type: AccountDetailResponseDto })
  public async accountDetail(
    @Param('accountId') accountId: string
  ): Promise<AccountDetailResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ACCOUNT_DETAIL,
        {
          accountId,
        }
      )
    );
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.UPDATE_ACCOUNT)
  @ApiOperation({ summary: 'Update user account by Org-Admin' })
  @ApiOkResponse({ type: UpdateAccountResponseDto })
  public async updateAccount(
    @Body() payload: UpdateAccountDto,
    @Param('accountId') accountId: string
  ): Promise<UpdateAccountResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.UPDATE_ACCOUNTS,
        { accountId, payload }
      )
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.PRODUCT_LIST)
  @ApiOperation({ summary: 'Product list for drop-down' })
  @ApiOkResponse({ type: GetProductsResponseDto })
  public async productListDropdown(): Promise<GetProductsResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.PRODUCT_LIST,
        {}
      )
    );
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.COMPANY_LIST)
  @ApiOperation({ summary: 'Company list for drop-down' })
  @ApiOkResponse({ type: GetProductsResponseDto })
  public async companyListDropdown(
    @Query() query: GetCompanyListDto
  ): Promise<GetProductsResponseDto> {
    return firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.COMPANY_LIST, {
        query,
      })
    );
  }
}
