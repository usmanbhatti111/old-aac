import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationRepository, User, UserRepository } from '@shared';
import { ResponseMessage, successResponse, UserRole } from '@shared/constants';
import {
  GetAdminUserDto,
  CreateUserDto,
  UpdateProfileDto,
  SignupDto,
  MediaObject,
  UpdateAvatarDto,
  CreateOrgUserDto,
} from '@shared/dto';
import { S3Service } from '@shared/services';
import { Model } from 'mongoose';
import { CompanyHouseService } from './company-house.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private companyHouseService: CompanyHouseService,
    @InjectModel('User') private readonly exampleModel: Model<User>,
    private readonly orgRepository: OrganizationRepository,
    private s3: S3Service
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

  async createOrgUser(payload: CreateOrgUserDto | any) {
    try {
      const result = await this.userRepository.create(payload);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async listUsers(payload: GetAdminUserDto) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        products,
        role = UserRole.SUPER_ADMIN,
      } = payload;
      const offset = (page - 1) * limit;

      const keysToRemove = ['page', 'limit', 'search', 'products'];
      keysToRemove.forEach((key) => delete payload[key]);

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
      let pipelines = [];

      if ([UserRole.ORG_ADMIN, UserRole.ORG_EMPLOYEE].includes(role)) {
        pipelines = [
          ...pipelines,
          {
            $lookup: {
              from: 'organizations',
              localField: 'organization',
              foreignField: '_id',
              as: 'organization',
            },
          },
          {
            $lookup: {
              from: 'products',
              localField: 'products',
              foreignField: '_id',
              as: 'products',
            },
          },
          { $unwind: '$organization' },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              avatar: 1,
              role: 1,
              products: {
                _id: 1,
                logo: 1,
                name: 1,
              },
              organization: {
                _id: 1,
                name: 1,
              },
              status: 1,
              createdAt: 1,
            },
          },
        ];
      }

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
          '_id firstName lastName role products organization igStatus status'
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

      const keysToRemove = ['userId'];
      keysToRemove.forEach((key) => delete payload[key]);

      const user = await this.userRepository.findByIdAndUpdate(
        { _id: userId },
        payload
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

  async updateAvatar(payload: UpdateAvatarDto) {
    const { userId, avatar, removeAvatar } = payload;

    try {
      const user = await this.userRepository.findOne({ _id: userId });

      if (removeAvatar === true && user.avatar != undefined) {
        await this.s3.deleteFile(user.avatar.url);
        await this.userRepository.findByIdAndUpdate(
          { _id: userId },
          { $unset: { avatar: 1 } }
        );
        return successResponse(
          HttpStatus.OK,
          'Avatar removed successfully!',
          {}
        );
      }

      if (avatar) {
        if (user.avatar != undefined) {
          await this.s3.deleteFile(user.avatar.url);
        }

        const s3Response = await this.s3.uploadFile(
          avatar,
          'users/avatar/{uuid}'
        );

        const profileImage: MediaObject = {
          ...s3Response,
          size: avatar.size,
          mimetype: avatar.mimetype,
        };

        const updatedUser = await this.userRepository.findByIdAndUpdate(
          { _id: userId },
          { avatar: profileImage }
        );

        return successResponse(
          HttpStatus.OK,
          ResponseMessage.SUCCESS,
          updatedUser
        );
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
