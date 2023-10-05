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
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddAccountDto,
  AddUserDto,
  GetUserDto,
  UpdateUserDto,
} from '@shared/dto';
import { Response } from 'express';
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
  public async addUser(@Body() payload: AddUserDto, @Res() res: Response) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.ADD_USER, {
        payload,
      })
    );

    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.USER_LIST)
  public async userList(
    @Query() query: GetUserDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.USER_LIST, {
        query,
      })
    );
    return res.status(200).json(response);
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.USER_PROFILE)
  public async userProfile(
    @Param('userId') userId: string,
    @Res() res: Response
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.USER_PROFILE, {
        userId,
      })
    );
    return res.status(response.statusCode).json(response);
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.UPDATE_PROFILE)
  public async updateProfile(
    @Body() payload: UpdateUserDto,
    @Param('userId') userId: string,
    @Res() res: Response
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.UPDATE_PROFILE,
        { userId, payload }
      )
    );
    return res.status(response.statusCode).json(response);
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.ADD_ACCOUNTS)
  public async addAccounts(
    @Body() payload: AddAccountDto,
    @Res() res: Response
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.SUPER_ADMIN.ADD_USER, {
        payload,
      })
    );

    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.ACCOUNTS_LIST)
  public async accountList(
    @Query() query: GetUserDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ACCOUNTS_LIST,
        {
          query,
        }
      )
    );
    return res.status(200).json(response);
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.UPDATE_PROFILE)
  public async updateAccount(
    @Body() payload: UpdateUserDto,
    @Param('userId') userId: string,
    @Res() res: Response
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.UPDATE_PROFILE,
        { userId, payload }
      )
    );
    return res.status(response.statusCode).json(response);
  }
}
