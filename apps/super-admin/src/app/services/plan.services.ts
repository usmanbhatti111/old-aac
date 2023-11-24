import { HttpStatus, Injectable } from '@nestjs/common';
import {
  EStatusToggle,
  MODEL,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import {
  AddPlanDto,
  AddPlanTypeDto,
  EditPlanDto,
  PlanDeleteDto,
  PlanFilterDto,
  ProductFeatureDto,
  ProductPermissionDto,
} from '@shared/dto';
import {
  PermissionRepository,
  Plan,
  PlanProductFeatureRepository,
  PlanProductPermissionRepository,
  PlanRepository,
  PlanTypeRepository,
  ProductFeaturesRepository,
  ProductsRepository,
} from '@shared';
import mongoose from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import dayjs from 'dayjs';

@Injectable()
export class PlanService {
  constructor(
    private planRepository: PlanRepository,
    private planTypeRepository: PlanTypeRepository,
    private productRepository: ProductsRepository,
    private featureRepository: ProductFeaturesRepository,
    private permissionRepository: PermissionRepository,
    private productFeatureRepository: PlanProductFeatureRepository,
    private planProductPermissionRepository: PlanProductPermissionRepository
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async getPlan(planId: string) {
    try {
      const data = await this.planRepository.aggregate([
        {
          $lookup: {
            from: MODEL.PLAN_TYPE,
            localField: 'planTypeId',
            foreignField: '_id',
            as: 'planType',
          },
        },
        {
          $lookup: {
            from: MODEL.PRODUCT,
            localField: 'planProducts',
            foreignField: '_id',
            as: 'planProducts',
          },
        },
        {
          $lookup: {
            from: MODEL.PLAN_PRODUCT_PERMISSION,
            localField: 'planProductPermissions',
            foreignField: '_id',
            as: 'planProductPermissions',
            // pipeline: [
            //   {
            //     $lookup: {
            //       from: MODEL.PERMISSION,
            //       localField: 'permissions',
            //       foreignField: '_id',
            //       as: 'permissions',
            //     },
            //   },
            // ],
          },
        },
        {
          $lookup: {
            from: MODEL.PLAN_PRODUCT_FEATURE,
            localField: 'planProductFeatures',
            foreignField: '_id',
            as: 'planProductFeatures',
          },
        },
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $unwind: {
            path: '$planType',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            planTypeId: 0,
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(planId),
            ...this.notDeletedFilter,
          },
        },
      ]);

      if (data[0]) {
        return successResponse(HttpStatus.OK, 'Plan Get Successfully', data[0]);
      } else {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          ResponseMessage.NOT_FOUND,
          []
        );
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getPlanTypes() {
    try {
      const res = await this.planTypeRepository.find();

      return successResponse(
        HttpStatus.OK,
        'Plans Types Fetched Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addPlanType(payload: AddPlanTypeDto) {
    try {
      const res = await this.planTypeRepository.create(payload);

      return successResponse(HttpStatus.CREATED, 'A new Plan type added', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getPlans(payload: PlanFilterDto) {
    try {
      const take = payload?.limit || 10;
      const page = payload?.page || 1;
      const skip = (page - 1) * take;

      const { search } = payload;

      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload?.createdAt) {
        const startDate = dayjs(payload?.createdAt).startOf('day');
        const endDate = dayjs(payload?.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }

      let searchFilter = {};
      if (search) {
        searchFilter = {
          $or: [
            {
              description: {
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

      delete payload.productId;

      const pipelines = [
        {
          $lookup: {
            from: MODEL.PLAN_TYPE,
            localField: 'planTypeId',
            foreignField: '_id',
            as: 'planType',
          },
        },
        {
          $lookup: {
            from: MODEL.PRODUCT,
            localField: 'planProducts',
            foreignField: '_id',
            as: 'planProducts',
          },
        },
        {
          $unwind: {
            path: '$planType',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            planTypeId: 0,
          },
        },
        { $match: filterQuery },
      ];

      const paginateRes = await this.planRepository.paginate({
        filterQuery: {},
        offset: skip,
        limit: take,
        pipelines,
      });

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deletePlan(payload: PlanDeleteDto) {
    try {
      const { deletedBy, planId } = payload;

      await this.planRepository.findOneAndUpdate(
        { _id: planId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(HttpStatus.OK, 'Plan Deleted Successfully', {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editPlan(payload: EditPlanDto) {
    try {
      const { planId } = payload;
      await this.planRepository.findOne({
        _id: planId,
        ...this.notDeletedFilter,
      });

      delete payload.planId;
      const payloadPlan = {
        ...payload,
        suite: undefined,
        productId: undefined,
        planFeature: undefined,
        planModule: undefined,
        updatedAt: Date.now(),
      };

      let planRes = await this.planRepository.findOneAndUpdate(
        { _id: planId },
        payloadPlan
      );

      if (payload?.suite && payload?.suite[0]) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: planId },
          {
            planProducts: [],
            planProductFeatures: payload?.planFeature[0]
              ? payload?.planFeature
              : [],
            planProductPermissions: payload?.planPermission[0]
              ? payload?.planPermission
              : [],
          }
        );
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const productId of payload.suite) {
          await this.savePlan(
            payloadPlan,
            productId,
            payload?.planFeature,
            payload?.planPermission,
            planRes
          );
        }
        // if single product then using product id, insert plan data
      } else if (payload?.productId) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: planId },
          {
            planProducts: [],
            planProductFeatures: payload?.planFeature[0]
              ? []
              : payload?.planFeature,
            planProductPermissions: payload?.planPermission[0]
              ? []
              : payload?.planPermission,
          }
        );
        await this.savePlan(
          payloadPlan,
          payload?.productId,
          payload?.planFeature,
          payload?.planPermission,
          planRes
        );
      }
      return successResponse(
        HttpStatus.CREATED,
        'Plan Updated Successfully',
        planRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async savePlan(
    payload: any = null,
    productId: string,
    featureProducts: ProductFeatureDto[],
    productPermissions: ProductPermissionDto[],
    plan: Plan = null,
    isCRM = false
  ) {
    const featureProduct = featureProducts.find(
      (val) => val.productId.toString() == productId.toString()
    );
    const productPermission = productPermissions.find(
      (val) => val.productId.toString() == productId.toString()
    );

    const product = await this.productRepository.findOne({
      _id: productId,
      status: EStatusToggle.ACTIVE,
    });

    const productFeatureResResList = [];
    if (featureProduct)
      for (const feature of featureProduct.features) {
        await this.featureRepository.findOne({
          _id: feature?.featureId,
        });
        productFeatureResResList.push(
          await this.productFeatureRepository.upsert(
            {
              productId,
              featureId: feature?.featureId,
            },
            { dealsAssociationsDetail: feature?.dealsAssociationsDetail }
          )
        ); // inserting plan product features data
      }

    if (productPermission)
      for (const slug of productPermission.permissionSlugs) {
        await this.permissionRepository.findOne({ slug });
      }

    const planProductPermission =
      await this.planProductPermissionRepository.upsert(
        { productId: productPermission?.productId },
        {
          productId: productPermission?.productId,
          permissionSlugs: productPermission?.permissionSlugs,
        }
      ); // inserting plan product module permission data

    if (plan)
      plan = await this.planRepository.findOneAndUpdate(
        { _id: plan._id },
        {
          planProducts: plan?.planProducts?.[0]
            ? [...plan.planProducts, product]
            : [product],
          planProductFeatures: plan?.planProductFeatures?.[0]
            ? [...plan.planProductFeatures, ...productFeatureResResList]
            : productFeatureResResList,
          planProductPermissions: plan?.planProductPermissions?.[0]
            ? [...plan.planProductPermissions, planProductPermission]
            : [planProductPermission],
          isCRM,
        }
      );
    else {
      plan = await this.planRepository.create({
        ...payload,
        planProducts: [product],
        planProductFeatures: productFeatureResResList,
        planProductPermissions: [planProductPermission],
      });
    }

    return plan;
  }

  async addPlan(payload: AddPlanDto) {
    try {
      // removing unnesssery data in payload for plan  and insert plan data
      const payloadPlan = {
        ...payload,
        suite: undefined,
        productId: undefined,
        planFeature: undefined,
        planModule: undefined,
      };

      let planRes = null;

      if (payload?.suite) {
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const productId of payload.suite) {
          planRes = await this.savePlan(
            payloadPlan,
            productId,
            payload?.planFeature,
            payload?.planPermission,
            planRes,
            true
          );
        }
      } else {
        // if single product then using product id, insert plan data
        planRes = await this.savePlan(
          payloadPlan,
          payload?.productId,
          payload?.planFeature,
          payload?.planPermission,
          planRes,
          false
        );
      }

      return successResponse(
        HttpStatus.CREATED,
        'Plan Created Successfully',
        planRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
