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
            localField: 'plan_type_id',
            foreignField: '_id',
            as: 'plan_type',
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
        { $skip: skip }, // Skip documents
        { $limit: take }, // Limit the number of documents
        {
          $lookup: {
            from: MODEL.PLAN_TYPE,
            localField: 'plan_type_id',
            foreignField: '_id',
            as: 'plan_type',
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
      const { plan_id } = payload;
      await this.planRepository.findOne({ _id: plan_id });

      delete payload.plan_id;
      const payloadPlan = {
        ...payload,
        suite: undefined,
        product_id: undefined,
        plan_feature: undefined,
        plan_module: undefined,
      };

      let planRes = await this.planRepository.findOneAndUpdate(
        { _id: plan_id },
        payloadPlan
      );

      if (payload.suite && payload.suite[0]) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: plan_id },
          {
            plan_products: [],
            plan_product_features: payload.plan_feature[0]
              ? payload.plan_feature
              : [],
            plan_product_module_permissions: payload.plan_module[0]
              ? payload.plan_module
              : [],
          }
        );
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const product_id of payload.suite) {
          await this.savePlan(
            payloadPlan,
            product_id,
            payload.plan_feature,
            payload.plan_module,
            planRes
          );
        }
        // if single product then using product id, insert plan data
      } else if (payload.product_id) {
        planRes = await this.planRepository.findOneAndUpdate(
          { _id: plan_id },
          {
            plan_products: [],
            plan_product_features: payload.plan_feature[0]
              ? []
              : payload.plan_feature,
            plan_product_module_permissions: payload.plan_module[0]
              ? []
              : payload.plan_module,
          }
        );
        await this.savePlan(
          payloadPlan,
          payload.product_id,
          payload.plan_feature,
          payload.plan_module,
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
    product_id: string,
    featureProducts: ProductFeatureDto[],
    moduleProducts: ProductModuleDto[],
    plan: Plan = null
  ) {
    const featureProduct = featureProducts.find(
      (val) => (val.product_id = product_id)
    );
    const moduleProduct = moduleProducts.find(
      (val) => (val.product_id = product_id)
    );

    const product = await this.productRepository.findOne({
      _id: product_id,
    });

    await this.moduleRepository.findOne({
      _id: moduleProduct.module_id,
    });

    await this.permissionRepository.findOne({
      _id: moduleProduct.module_permission_id,
    });

    await this.featureRepository.findOne({
      _id: featureProduct.feature_id,
    });

    const productFeatureRes = this.productFeatureRepository.upsert(
      {
        product_id,
        feature_id: featureProduct.feature_id,
      },
      { deals_associations_detail: featureProduct?.deals_associations_detail }
    ); // inserting plan product features data

    const productsModulePermissionRes =
      await this.productModulePermissionRepository.upsert(
        {
          product_id,
          module_id: moduleProduct.module_id,
          module_permission_id: moduleProduct.module_permission_id,
        },
        {
          product_id,
          module_id: moduleProduct.module_id,
          module_permission_id: moduleProduct.module_permission_id,
        }
      ); // inserting plan product module permission data

    if (plan)
      plan = await this.planRepository.findOneAndUpdate(
        { _id: plan._id },
        {
          plan_products: [...plan.plan_products, product],
          plan_product_features: [
            ...plan.plan_product_features,
            productFeatureRes,
          ],
          plan_product_module_permissions: [
            ...plan.plan_product_module_permissions,
            productsModulePermissionRes,
          ],
        }
      );
    else {
      plan = await this.planRepository.create({
        ...payload,
        plan_products: [...plan.plan_products, product],
        plan_product_features: [
          ...plan.plan_product_features,
          productFeatureRes,
        ],
        plan_product_module_permissions: [
          ...plan.plan_product_module_permissions,
          productsModulePermissionRes,
        ],
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
        product_id: undefined,
        plan_feature: undefined,
        plan_module: undefined,
      };

      let planRes = null;

      if (payload.suite) {
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const product_id of payload.suite) {
          planRes = await this.savePlan(
            payloadPlan,
            product_id,
            payload.plan_feature,
            payload.plan_module,
            planRes
          );
        }
      } else {
        // if single product then using product id, insert plan data
        planRes = await this.savePlan(
          payloadPlan,
          payload.product_id,
          payload.plan_feature,
          payload.plan_module,
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
