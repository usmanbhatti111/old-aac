import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository } from '@shared';
import { errorResponse, successResponse } from '@shared/constants';
import { AssetsSoftwareDto } from '@shared/dto';

@Injectable()
export class SoftwareService {
  constructor(private softwareRepository: AssetsSoftwareRepository) {}

  async addSoftware(payload: AssetsSoftwareDto) {
    try {
      const { ...dto } = payload;
      const softwareInfo = await this.softwareRepository.create({ ...dto });
      const response = successResponse(
        HttpStatus.CREATED,
        `Assets Software Created Successfully`,
        softwareInfo
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignCatToSoftware(payload) {
    try {
      const { id, category } = payload;
      const response = await this.softwareRepository.findOneAndUpdate(
        { _id: id },
        { $set: { categoryId: category.categoryId } }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
