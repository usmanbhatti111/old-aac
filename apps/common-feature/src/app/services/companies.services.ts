import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CompanyRepository } from '@shared';
import {
  EIsDeletedStatus,
  MODEL,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import {
  ChangeCompanyOwnerDto,
  CreateComapanyDTO,
  DeleteCompaniesDto,
  GetComapanyDto,
  GetCompanyDetailsDto,
  GetDeletedCompanisDto,
  UpdateComapanyDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class CompaniesService {
  constructor(private readonly comapanyRepository: CompanyRepository) {}

  async deleteCompanies(payload: DeleteCompaniesDto) {
    try {
      const ids = payload?.ids?.split(',');

      const filterQuery = {
        _id: { $in: ids },
        isDeleted: EIsDeletedStatus.ACTIVE,
      };

      const data = {
        isDeleted: EIsDeletedStatus.SOFT_DELETED,
        deletedById: payload?.deletedById,
        deletedAt: new Date(),
      };

      const res = await this.comapanyRepository.updateMany(filterQuery, data);

      let message: string;
      if (ids.length === res?.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res?.modifiedCount} ${
          res?.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      return successResponse(HttpStatus.OK, message);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getUniqueCompaniesOwners() {
    try {
      const res = await this.comapanyRepository.aggregate([
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'ownerId',
            foreignField: '_id',
            as: 'companiesOwners',
          },
        },
        {
          $unwind: {
            path: '$companiesOwners',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$ownerId',
            companiesOwners: { $first: '$companiesOwners' },
          },
        },
        {
          $addFields: {
            name: {
              $reduce: {
                input: [
                  '$companiesOwners.firstName',
                  '$companiesOwners.middleName',
                  '$companiesOwners.lastName',
                ],
                initialValue: '',
                in: {
                  $cond: {
                    if: { $ne: ['$$this', null] },
                    then: { $concat: ['$$value', ' ', '$$this'] },
                    else: '$$value',
                  },
                },
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                { _id: '$companiesOwners._id' },
                { name: '$name' },
              ],
            },
          },
        },
      ]);

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async changeCompanyOwner(payload: ChangeCompanyOwnerDto) {
    try {
      const { id } = payload;

      const filterQuery = {
        _id: id,
        isDeleted: EIsDeletedStatus.ACTIVE,
      };

      const data = {
        ownerId: payload.ownerId,
        updatedById: payload?.updatedBy,
      };

      const res = await this.comapanyRepository.findOneAndUpdate(
        filterQuery,
        data
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getCompanyDetails(payload: GetCompanyDetailsDto) {
    try {
      const filterQuery = [
        {
          $match: {
            _id: payload?.id,
            isDeleted: EIsDeletedStatus.ACTIVE,
          },
        },
      ];

      const dealStage = [
        {
          $lookup: {
            from: MODEL.LIFECYCLE_STAGE,
            localField: 'lifeCyleId',
            foreignField: '_id',
            as: 'dealStage',
          },
        },
        {
          $unwind: {
            path: '$dealStage',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            dealStage: { $ifNull: ['$dealStage.name', ''] },
          },
        },
      ];

      const dealOwner = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'ownerId',
            foreignField: '_id',
            as: 'dealOwner',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $reduce: {
                      input: ['$firstName', '$middleName', '$lastName'],
                      initialValue: '',
                      in: {
                        $cond: {
                          if: { $ne: ['$$this', null] },
                          then: { $concat: ['$$value', ' ', '$$this'] },
                          else: '$$value',
                        },
                      },
                    },
                  },
                  email: { $ifNull: ['$email', ''] },
                  phoneNumber: { $ifNull: ['$phoneNumber', ''] },
                  // add user profile image
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$dealOwner',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      const pipelines = [...filterQuery, ...dealStage, ...dealOwner];

      const res = await this.comapanyRepository.aggregate(pipelines);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  // nome

  async create(payload: CreateComapanyDTO) {
    const response = await this.comapanyRepository.create(payload);
    return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
  }

  async list(payload: GetComapanyDto) {
    try {
      const { page = 1, limit = 10, search } = payload;
      const pipelines = [];
      const offset = limit * (page - 1);

      if (search) {
        pipelines.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }
      const filterQuery = {
        ...payload,
        isDeleted: EIsDeletedStatus.ACTIVE,
      };

      const { result } = await this.comapanyRepository.paginate({
        filterQuery,
        pipelines,
        offset,
        limit,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async detail(id: string) {
    const res = await this.comapanyRepository.findOne({ _id: id });
    return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
  }

  async update(payload: UpdateComapanyDto) {
    const { id, data } = payload;
    const res = await this.comapanyRepository.findByIdAndUpdate(
      { _id: id },
      data
    );
    return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
  }

  async delete(payload: { ids: string[]; deletedById: string }) {
    try {
      const res = await this.comapanyRepository.findOneAndUpdate(
        {
          _id: payload?.ids,
        },
        {
          deletedById: payload?.deletedById,
          isDeleted: EIsDeletedStatus.SOFT_DELETED,
        }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async deletedCompanies(payload: GetDeletedCompanisDto) {
    try {
      const { page = 1, limit = 10, search } = payload;
      const pipelines = [];
      const offset = limit * (page - 1);
      const filterQuery = {
        isDeleted: EIsDeletedStatus.SOFT_DELETED,
      };

      if (payload?.dateStart && payload?.dateEnd) {
        const startDate = dayjs(payload?.dateStart).startOf('day').toDate();
        const endDate = dayjs(payload?.dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      if (search) {
        pipelines.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }

      const { result } = await this.comapanyRepository.paginate({
        filterQuery,
        pipelines,
        limit,
        offset,
      });

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        result ? result : []
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
