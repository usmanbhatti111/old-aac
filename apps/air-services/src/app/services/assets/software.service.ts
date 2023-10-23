import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository } from '@shared';
import {
  AssetsSoftwareDto,
  GetAssetsSoftwareDetails,
  IdDto,
  PaginationDto,
} from '@shared/dto';

import { successResponse } from '@shared/constants';

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
        switch (createdDate) {
          case 'Today':
            {
              const Today = {
                $match: {
                  createdAt: {
                    $lte: new Date(),
                    $gte: new Date(today.getTime() - 1 * 12 * 60 * 60 * 1000),
                  },
                },
              };
              pipelines.push(Today);
            }
            break;
          case 'Yesterday':
            {
              const yesterday = {
                $match: {
                  createdAt: {
                    $lte: new Date(today.getTime() - 1 * 12 * 60 * 60 * 1000),
                    $gte: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
                  },
                },
              };
              pipelines.push(yesterday);
            }
            break;
          case 'PreviousWeek':
            {
              const previousWeek = {
                $match: {
                  createdAt: {
                    $lte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
                    $gte: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
                  },
                },
              };
              pipelines.push(previousWeek);
            }
            break;
          case 'PreviousMonth': {
            const PreviousMonth = {
              $match: {
                createdAt: {
                  $lte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
                  $gte: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
                },
              },
            };
            pipelines.push(PreviousMonth);
          }
        }
      }
      if (updatedDate) {
        switch (updatedDate) {
          case 'Today':
            {
              const Today = {
                $match: {
                  updatedAt: {
                    $lte: new Date(),
                    $gte: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
                  },
                },
              };

              pipelines.push(Today);
            }
            break;
          case 'Yesterday':
            {
              const yesterday = {
                $match: {
                  updatedAt: {
                    $lte: new Date(today.getTime() - 1 * 12 * 60 * 60 * 1000),
                    $gte: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
                  },
                },
              };
              pipelines.push(yesterday);
            }
            break;
          case 'PreviousWeek':
            {
              const previousWeek = {
                $match: {
                  updatedAt: {
                    $lte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
                    $gte: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
                  },
                },
              };
              pipelines.push(previousWeek);
            }
            break;
          case 'PreviousMonth': {
            const PreviousMonth = {
              $match: {
                updatedAt: {
                  $lte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
                  $gte: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
                },
              },
            };
            pipelines.push(PreviousMonth);
          }
        }
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
  getTimeLogicForPipeLine(dateFilter, dateKey) {
    const today = new Date();
    const dateMatchFilter = {
      $match: {},
    };
    switch (dateFilter) {
      case 'Today': {
        dateMatchFilter.$match[dateKey] = {
          $lte: new Date(),
          $gte: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        };
        return dateMatchFilter;
      }
      case 'Yesterday': {
        dateMatchFilter.$match[dateKey] = {
          $lte: new Date(today.getTime() - 1 * 12 * 60 * 60 * 1000),
          $gte: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        };
        return dateMatchFilter;
      }
      case 'PreviousWeek': {
        dateMatchFilter.$match[dateKey] = {
          $lte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
          $gte: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
        };
        return dateMatchFilter;
      }
      case 'PreviousMonth': {
        dateMatchFilter.$match[dateKey] = {
          $lte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
          $gte: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
        };
        return dateMatchFilter;
      }
    }
  }
}
