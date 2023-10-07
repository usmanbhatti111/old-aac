import {
  Body,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateFaqDto,
  CreateFaqResponseDto,
  FilterFaqsDto,
  GetFaqResponseDto,
  GetFaqsResponseDto,
  UpdateFaqDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.SETTINGS)
@Controller(CONTROLLERS.SETTINGS.FAQS)
@ApiBearerAuth()
export class FaqsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private faqServiceClient: ClientProxy
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateFaqResponseDto })
  public async createFaq(
    @Body() payload: CreateFaqDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.CREATE_FAQ }, payload)
    );

    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.FAQS.GET_FAQ)
  @ApiCreatedResponse({ type: GetFaqResponseDto })
  public async getFaq(@Param('id') id: string, @Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.GET_FAQ }, { id })
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get()
  @ApiCreatedResponse({ type: GetFaqsResponseDto })
  public async getFaqs(
    @Query() filter: FilterFaqsDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.faqServiceClient.send({ cmd: RMQ_MESSAGES.FAQS.GET_FAQS }, filter)
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Patch(API_ENDPOINTS.FAQS.UPDATE_FAQ)
  @ApiCreatedResponse({ type: GetFaqResponseDto })
  public async updateFaq(
    @Body() payload: UpdateFaqDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.faqServiceClient.send(
          { cmd: RMQ_MESSAGES.FAQS.UPDATE_FAQ },
          payload
        )
      );

      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Delete(API_ENDPOINTS.FAQS.DELETE_FAQ)
  @ApiCreatedResponse({ type: GetFaqResponseDto })
  public async deleteFaq(
    @Query('id') id: [string],
    @Res() res: Response | any
  ) {
    try {
      if (typeof id === 'string') id = [id];
      const response = await firstValueFrom(
        this.faqServiceClient.send(
          { cmd: RMQ_MESSAGES.FAQS.DELETE_FAQ },
          { id }
        )
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}
