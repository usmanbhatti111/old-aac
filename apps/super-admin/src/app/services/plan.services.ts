import { HttpStatus, Injectable } from '@nestjs/common';
import {
  MODEL,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import {
  AddPlanDto,
  EditPlanDto,
  PaginationDto,
  ProductFeatureDto,
  ProductModuleDto,
} from '@shared/dto';
import {
  FeatureRepository,
  ModuleRepository,
  PermissionRepository,
  Plan,
  PlanProductFeatureRepository,
  PlanProductModulePermissionRepository,
  PlanRepository,
  ProductRepository,
} from '@shared';
import mongoose from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PlanService {
  constructor(
    private planRepository: PlanRepository,
    private productRepository: ProductRepository,
    private moduleRepository: ModuleRepository,
    private featureRepository: FeatureRepository,
    private permissionRepository: PermissionRepository,
    private productFeatureRepository: PlanProductFeatureRepository,
    private productModulePermissionRepository: PlanProductModulePermissionRepository
  ) {}

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
        { $match: { _id: new mongoose.Types.ObjectId(planId) } },
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

  async getPlans(payload: PaginationDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      const pipelines = [
        {
          $lookup: {
            from: MODEL.PLAN_TYPE,
            localField: 'planTypeId',
            foreignField: '_id',
            as: 'planType',
          },
        },
      ];

      const paginateRes = await this.planRepository.paginate({
        filterQuery: {},
        offset: skip,
        limit: payload.limit,
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

  async deletePlan(planId: string) {
    try {
      await this.planRepository.findOne({ _id: planId });

      await this.planRepository.delete({ _id: planId });
      return successResponse(HttpStatus.OK, 'Plan Deleted Successfully', {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editPlan(payload: EditPlanDto) {
    try {
      const { planId } = payload;
      await this.planRepository.findOne({ _id: planId });

      delete payload.planId;
      const payloadPlan = {
        ...payload,
        suite: undefined,
        productId: undefined,
        planFeature: undefined,
        planModule: undefined,
      };

      let planRes = await this.planRepository.findOneAndUpdate(
        { _id: planId },
        payloadPlan
      );

      if (payload.suite && payload.suite[0]) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: planId },
          {
            planProducts: [],
            planProductFeatures: payload.planFeature[0]
              ? payload.planFeature
              : [],
            planProductModulePermissions: payload.planModule[0]
              ? payload.planModule
              : [],
          }
        );
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const productId of payload.suite) {
          await this.savePlan(
            payloadPlan,
            productId,
            payload.planFeature,
            payload.planModule,
            planRes
          );
        }
        // if single product then using product id, insert plan data
      } else if (payload.productId) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: planId },
          {
            planProducts: [],
            planProductFeatures: payload.planFeature[0]
              ? []
              : payload.planFeature,
            planProductModulePermissions: payload.planModule[0]
              ? []
              : payload.planModule,
          }
        );
        await this.savePlan(
          payloadPlan,
          payload.productId,
          payload.planFeature,
          payload.planModule,
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
    moduleProducts: ProductModuleDto[],
    plan: Plan = null
  ) {
    const featureProduct = featureProducts.find(
      (val) => val.productId == productId
    );
    const moduleProduct = moduleProducts.find(
      (val) => val.productId == productId
    );

    const product = await this.productRepository.findOne({
      _id: productId,
    });

    await this.moduleRepository.findOne({
      _id: moduleProduct.moduleId,
    });

    await this.permissionRepository.findOne({
      _id: moduleProduct.modulePermissionId,
    });

    await this.featureRepository.findOne({
      _id: featureProduct.featureId,
    });

    const productFeatureRes = this.productFeatureRepository.upsert(
      {
        productId,
        featureId: featureProduct.featureId,
      },
      { dealsAssociationsDetail: featureProduct?.dealsAssociationsDetail }
    ); // inserting plan product features data

    const productsModulePermissionRes =
      await this.productModulePermissionRepository.upsert(
        {
          productId,
          moduleId: moduleProduct.moduleId,
          modulePermissionId: moduleProduct.modulePermissionId,
        },
        {
          productId,
          moduleId: moduleProduct.moduleId,
          modulePermissionId: moduleProduct.modulePermissionId,
        }
      ); // inserting plan product module permission data

    const productFeature = await productFeatureRes;
    const productsModulePermission = await productsModulePermissionRes;

    if (plan)
      plan = await this.planRepository.findOneAndUpdate(
        { _id: plan._id },
        {
          planProducts: plan?.planProducts?.[0]
            ? [...plan.planProducts, product]
            : [product],
          planProductFeatures: plan?.planProductFeatures?.[0]
            ? [...plan.planProductFeatures, productFeature]
            : [productFeature],
          planProductModulePermissions: plan?.planProductModulePermissions?.[0]
            ? [...plan.planProductModulePermissions, productsModulePermission]
            : [productsModulePermission],
        }
      );
    else {
      plan = await this.planRepository.create({
        ...payload,
        planProducts: plan?.planProducts?.[0]
          ? [...plan.planProducts, product]
          : [product],
        planProductFeatures: plan?.planProductFeatures?.[0]
          ? [...plan.planProductFeatures, productFeature]
          : [productFeature],
        planProductModulePermissions: plan?.planProductModulePermissions?.[0]
          ? [...plan.planProductModulePermissions, productsModulePermission]
          : [productsModulePermission],
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

      if (payload.suite) {
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const productId of payload.suite) {
          planRes = await this.savePlan(
            payloadPlan,
            productId,
            payload.planFeature,
            payload.planModule,
            planRes
          );
        }
      } else {
        // if single product then using product id, insert plan data
        planRes = await this.savePlan(
          payloadPlan,
          payload.productId,
          payload.planFeature,
          payload.planModule,
          planRes
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
