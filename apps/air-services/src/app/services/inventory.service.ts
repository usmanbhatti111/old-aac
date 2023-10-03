import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { PrismaService } from '@shared/services';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async addAssets(payload: any) {
    try {
      const res = await this.prisma.asset.create({ data: payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getAssets() {
    try {
      const res = await this.prisma.asset.findMany();
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
