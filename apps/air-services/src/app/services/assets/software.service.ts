import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository, mongooseDateFilter } from '@shared';
import {
  AssetsSoftwareDto,
  GetAssetsSoftwareDetails,
  IdDto,
  PaginationDto,
} from '@shared/dto';

import { AssetSoftwareCreatedAtEnum, successResponse } from '@shared/constants';

@Injectable()
export class SoftwareService {
  constructor(private softwareRepository: AssetsSoftwareRepository) {}

  async addSoftware(payload: AssetsSoftwareDto) {
    try {
      const { ...dto } = payload;
      const data = await this.softwareRepository.create({ ...dto });
      const response = successResponse(
        HttpStatus.CREATED,
        `Assets Software Created Successfully`,
        data
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
      const data = await this.softwareRepository.findOneAndUpdate(
        { _id: id.id },
        { $set: { details, name, type, status } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Edit Successfully`,
        data
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
  async getSoftware(payload: {
    dto: GetAssetsSoftwareDetails;
    pagination: PaginationDto;
  }) {
    try {
      const { search, type, status, createdDate, updatedDate } = payload.dto;
      const { limit } = payload.pagination;
      const offset = payload.pagination.page;
      const today = new Date();
      let searchFilter: any;
      if (search) {
        searchFilter = {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        };
      }
      const pipelines: any = [];
      const filterQuery = {
        ...searchFilter,
      };
      if (type) {
        filterQuery.type = type;
      }
      if (status) {
        filterQuery.status = status;
      }
      if (createdDate) {
        const filter = mongooseDateFilter(createdDate, 'createdAt');
        pipelines.push({ $match: filter });
      }
      if (updatedDate) {
        const filter = mongooseDateFilter(updatedDate, 'updatedAt');
        pipelines.push({ $match: filter });
      }

      const softwareDetails = await this.softwareRepository.paginate({
        filterQuery,
        limit,
        offset,
        pipelines,
      });
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Details Successfully`,
        softwareDetails
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
      throw new RpcException(error);
    }
  }
}
