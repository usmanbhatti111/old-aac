import { HttpStatus, Injectable } from '@nestjs/common';
import { FaqRepository } from '@shared';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { CreateFaqDto, FilterFaqsDto, IdDTO, UpdateFaqDto } from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class FaqsService {
  constructor(private faqRepository: FaqRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createFaq(payload: CreateFaqDto) {
    try {
      const res = await this.faqRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getFaq(payload: IdDTO) {
    try {
      const res = await this.faqRepository.findOne({ _id: payload.id });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getFaqs(payload: FilterFaqsDto) {
    try {
      const { page, limit, search } = payload;

      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }

      let searchFilter;
      if (search) {
        searchFilter = {
          $or: [
            {
              faqQuestion: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              faqAnswer: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              faqCategory: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
          ],
        };
      }

      const filterQuery = {
        ...createdAtFilter,
        ...payload,
        ...this.notDeletedFilter,
        ...searchFilter,
      };

      const res = await this.faqRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async updateFaq(payload: UpdateFaqDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const res = await this.faqRepository.findOneAndUpdate(
        { _id: id, ...this.notDeletedFilter },
        payload
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async deleteFaq(payload: IdDTO) {
    try {
      const { id } = payload;
      const res = await this.faqRepository.updateMany(
        { _id: { $in: id } },
        {
          isDeleted: true,
        }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }
}
