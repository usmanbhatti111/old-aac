import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  INTERNAL_SERVER_RESPONSE,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateExampleDto,
  CreateExampleResponseDto,
  GetExamplesDto,
  GetExamplesResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@Controller(CONTROLLERS.EXAMPLE)
@ApiTags(API_TAGS.EXAMPLE)
export class AppController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private readonly serviceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.EXAMPLE.CREATE_EXAMPLE)
  @ApiCreatedResponse({ type: CreateExampleResponseDto })
  async create(@Body() body: CreateExampleDto, @Res() res: Response) {
    try {
      const response = await firstValueFrom(
        this.serviceClient.send(
          { cmd: RMQ_MESSAGES.EXAMPLE.CREATE_EXAMPLE },
          body
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(INTERNAL_SERVER_RESPONSE);
    }
  }

  @Get(API_ENDPOINTS.EXAMPLE.GET_EXAMPLES)
  @ApiOkResponse({ type: GetExamplesResponseDto })
  async getList(@Query() query: GetExamplesDto, @Res() res: Response) {
    try {
      const response = await firstValueFrom(
        this.serviceClient.send(
          { cmd: RMQ_MESSAGES.EXAMPLE.GET_EXAMPLES },
          query
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      console.log('here');
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(INTERNAL_SERVER_RESPONSE);
    }
  }

  @Patch(API_ENDPOINTS.EXAMPLE.EDIT_EXAMPLE)
  @ApiOkResponse({ type: CreateExampleResponseDto })
  @ApiParam({ name: 'id' })
  async edit(
    @Param('id') id: string,
    @Body() body: CreateExampleDto,
    @Res() res: Response
  ) {
    try {
      const response = await firstValueFrom(
        this.serviceClient.send(
          { cmd: RMQ_MESSAGES.EXAMPLE.EDIT_EXAMPLE },
          { id, ...body }
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(INTERNAL_SERVER_RESPONSE);
    }
  }
}
