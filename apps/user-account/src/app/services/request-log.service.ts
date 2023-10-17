import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { RequestLogRepository } from '@shared';
import { CreateRequestLogDto, IdDTO } from '@shared/dto';

@Injectable()
export class RequestLogService {
  constructor(private requestLogRepository: RequestLogRepository) {}

  async createRequestLog(payload: CreateRequestLogDto) {
    try {
      const res = await this.requestLogRepository.create(payload);

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async getRequestLogs() {
    try {
      const res = await this.requestLogRepository.find();
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }
  async getRequestLogsByUser(payload: IdDTO) {
    try {
      const res = await this.requestLogRepository.find({ user: payload.id });
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }
}
