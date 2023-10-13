import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository } from '@shared';

import { IdDto } from '@shared/dto';
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
  async editSoftware(payload: { id: IdDto; dto: AssetsSoftwareDto }) {
    try {
      const { id, ...dto } = payload;
      const { details, name, status, type } = dto.dto;
      const softwareUpdate = await this.softwareRepository.findOneAndUpdate(
        { _id: id.id },
        { $set: { details, name, type, status } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Edit Successfully`,
        softwareUpdate
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteSoftware(payload: { id: IdDto }) {
    try {
      const { id } = payload.id;
      const softwareInfo = await this.softwareRepository.delete({ _id: id });
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Deleted Successfully`,
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
