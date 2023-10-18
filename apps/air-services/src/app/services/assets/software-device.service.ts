import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InventoryRepository } from '@shared';
import { successResponse } from '@shared/constants';

@Injectable()
export class SoftwareDeviceService {
  constructor(private InventoryRepository: InventoryRepository) {}

  async addSoftwareDevice(payload) {
    try {
      const { id, softwareId } = payload;
      const response = await this.InventoryRepository.findOneAndUpdate(
        { _id: id },
        { $push: { deviceIds: softwareId.softwareId } }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async removeSoftwareDevice(payload) {
    try {
      const { id, softwareId } = payload;
      const softwareInfo = await this.InventoryRepository.findOneAndUpdate(
        { _id: id },
        { $pull: { deviceIds: softwareId.softwareId } }
      );
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
}
