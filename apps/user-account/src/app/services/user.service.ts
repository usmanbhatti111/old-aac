import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationRepository, User, UserRepository } from '@shared';
import { ResponseMessage, successResponse, UserRole } from '@shared/constants';
import {
  GetAdminUserDto,
  CreateUserDto,
  UpdateProfileDto,
  EditUserByAdminDto,
  SignupDto,
} from '@shared/dto';
import { Model } from 'mongoose';
import { CompanyHouseService } from './company-house.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private companyHouseService: CompanyHouseService,
    @InjectModel('User') private readonly exampleModel: Model<User>,
    private readonly orgRepository: OrganizationRepository
  ) {}

  async create(payload: CreateUserDto) {
    try {
      const { crn, role } = payload;

      if (role === UserRole.SUPER_ADMIN) {
        // PENDING: (need to create lambda function or new flow with identitygram) Send temporary password email
        // Change cognitoId to required true when it is done
        const response = await this.userRepository.create(payload);
        return successResponse(
          HttpStatus.OK,
          ResponseMessage.SUCCESS,
          response
        );
      } else if (role === UserRole.ORG_ADMIN) {
        const org = await this.createUserOrg(crn);
        payload.organization = org._id.toString();
        const result = await this.userRepository.create(payload);

        return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
      } else {
        return successResponse(
          HttpStatus.OK,
          ResponseMessage.SUCCESS,
          `Wrong user role ${role}`
        );
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async listUsers(payload: GetAdminUserDto) {
    try {
      const { page = 1, limit = 10, search, products } = payload;
      const offset = (page - 1) * limit;
      delete payload.page;
      delete payload.limit;
      delete payload.search;
      delete payload.products;

      let filterQuery = {};
      if (search) {
        filterQuery = {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              lastName: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        };
      }

      filterQuery = payload.products
        ? {
            ...filterQuery,
            ...payload,
            products: { $in: [products] },
          }
        : {
            ...filterQuery,
            ...payload,
          };
      const pipelines = [];

      pipelines.push({
        $project: {
          _id: 1,
          firstName: 1,
          middleName: 1,
          lastName: 1,
          role: 1,
          products: 1,
          status: 1,
          organization: 1,
          createdAt: 1,
        },
      });

      pipelines.push({
        $lookup: {
          from: 'organizations',
          localField: 'organization',
          foreignField: '_id',
          as: 'organization',
        },
      });

      const res = await this.userRepository.paginate({
        filterQuery,
        pipelines,
        offset,
        limit,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createForSignup(payload: SignupDto) {
    try {
      const { role } = payload;

      if (role === UserRole.ORG_ADMIN) {
        const org = await this.createUserOrg(payload.crn);
        payload.organization = org._id.toString();
      }

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.userRepository.create(payload)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async loggedInUser(payload: { email: string }) {
    try {
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.exampleModel
          .findOne({ ...payload })
          .populate('products organization')
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findUserByUniqueFields(payload: {
    _id?: string;
    email?: string;
    cognitoId?: string;
  }) {
    try {
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.userRepository.findOne(
          { ...payload },
          '_id firstName middleName lastName role products organization igStatus status'
        )
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async userProfile(userId: string) {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateProfile(payload: UpdateProfileDto) {
    try {
      const { userId } = payload;
      delete payload.userId;

      const user = await this.userRepository.findByIdAndUpdate(
        { _id: userId },
        payload
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editUserByAdmin(payload: EditUserByAdminDto) {
    try {
      const { userId, products } = payload;
      delete payload.userId;
      delete payload.products;
      delete payload.companyName;
      delete payload.CNR;
      let mongooseQuery = {};
      if (products) {
        mongooseQuery = { $addToSet: { products: { $each: products } } };
      }

      const user = await this.userRepository.findByIdAndUpdate(
        { _id: userId },
        { ...mongooseQuery, ...payload }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createUserOrg(crn: number) {
    const { data } = await this.companyHouseService.searchCompanyByCode({
      crn,
    });

    const { company_name, registered_office_address, company_number } = data;
    const { country, postal_code, address_line_2, address_line_1, locality } =
      registered_office_address;
    const organizationAddress = {
      street: `${address_line_1}, ${address_line_2}`,
      city: locality,
      state: country,
      postalCode: postal_code,
    };
    const orgPayload = {
      crn: company_number,
      name: company_name,
      address: organizationAddress,
    };

    return this.orgRepository.create(orgPayload);
  }
}
