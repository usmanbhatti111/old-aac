import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository } from '@shared';
import { successResponse } from '@shared/constants';
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
}
