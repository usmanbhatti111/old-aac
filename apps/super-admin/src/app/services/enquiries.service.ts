import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EnquiriesRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  AddEnquiryDto,
  DeleteEnquiriesDto,
  GetEnquiriesDto,
  IdDto,
  UpdateEnquiryDto,
} from '@shared/dto';

@Injectable()
export class EnquiriesService {
  constructor(private enquiriesRepository: EnquiriesRepository) {}

  async addEnquiries(payload: AddEnquiryDto) {
    try {
      const res = await this.enquiriesRepository.create(payload);

      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getEnquiries(payload: GetEnquiriesDto) {
    try {
      const limit = payload?.limit;
      const offset = payload?.page;

      const filterQuery = { isDeleted: false };

      if (payload?.status) {
        filterQuery['status'] = payload?.status;
      }

      const createdByPipeline = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $reduce: {
                      input: [
                        '$candidates.firstName',
                        '$candidates.middleName',
                        '$candidates.lastName',
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
                  companyName: { $ifNull: ['$companyName', ''] },
                  email: { $ifNull: ['$email', ''] },
                  phoneNumber: { $ifNull: ['$phoneNumber', ''] },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      let searchPipeline = [];
      if (payload?.search) {
        const search = { $regex: payload?.search, $options: 'i' };

        searchPipeline = [
          {
            $match: {
              $or: [
                { 'createdBy.name': search },
                { 'createdBy.companyName': search },
                { 'createdBy.email': search },
              ],
            },
          },
        ];
      }

      const pipelines = [...createdByPipeline, ...searchPipeline];

      const response = await this.enquiriesRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getEnquiry(payload: IdDto) {
    try {
      const filterQuery = { isDeleted: false, _id: payload?.id };

      const res = await this.enquiriesRepository.findOne(filterQuery);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateEnquiries(payload: UpdateEnquiryDto) {
    try {
      const { id } = payload;

      const filter = { _id: id, isDeleted: false };

      const res = await this.enquiriesRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteEnquiries(payload: DeleteEnquiriesDto) {
    try {
      const ids = payload?.ids?.split(',');

      const filter = { _id: { $in: ids }, isDeleted: false };
      const data = { isDeleted: true, deletedBy: payload?.deletedBy };

      const res = await this.enquiriesRepository.updateMany(filter, data);

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      return successResponse(HttpStatus.OK, message);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
