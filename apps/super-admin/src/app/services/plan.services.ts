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
  PlanProductFeatureRepository,
  PlanProductModulePermissionRepository,
  PlanProductModuleRepository,
  PlanProductRepository,
  PlanRepository,
  ProductRepository,
} from '@shared';
import mongoose from 'mongoose';

@Injectable()
export class PlanService {
  constructor(
    private planRepository: PlanRepository,
    private productRepository: ProductRepository,
    private planProductRepository: PlanProductRepository,
    private planProductFeatureRepository: PlanProductFeatureRepository,
    private planProductModuleRepository: PlanProductModuleRepository,
    private planProductModulePermissionRepository: PlanProductModulePermissionRepository
  ) {}

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
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async editPlan(payload: EditPlanDto) {
    try {
      const { plan_id } = payload;
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
          { plan_products: [] }
        );
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const product_id of payload.suite) {
          const product = await this.productRepository.findOne({
            _id: product_id,
          });
          planRes = await this.planRepository.findOneAndUpdate(
            { _id: plan_id },
            { plan_products: [...planRes.plan_products, product] }
          );
        }
        // if single product then using product id, insert plan data
      } else if (payload.product_id) {
        const product = await this.productRepository.findOne({
          _id: payload.product_id,
        });
        await this.planRepository.findOneAndUpdate(
          { _id: plan_id },
          { plan_products: [product] }
        );
      }

      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        planRes
      );
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async savePlan(
    plan_id: string | mongoose.Types.ObjectId,
    product_id: string,
    featureProducts: ProductFeatureDto[],
    moduleProducts: ProductModuleDto[]
  ) {
    const planProdustsRes = await this.planProductRepository.create({
      plan_id,
      product_id,
    });

    const featureProduct = featureProducts.find(
      (val) => (val.product_id = product_id)
    );
    const moduleProduct = moduleProducts.find(
      (val) => (val.product_id = product_id)
    );

    await this.planProductFeatureRepository.create({
      plan_id,
      product_id,
      plan_product_id: planProdustsRes._id,
      feature_id: featureProduct.feature_id,
      deals_associations_detail: featureProduct?.deals_associations_detail,
    }); // inserting plan product features data

    const planProductsModuleRes = await this.planProductModuleRepository.create(
      {
        plan_id,
        product_id,
        module_id: moduleProduct.module_id,
        plan_product_id: planProdustsRes._id,
      }
    ); // inserting plan product module data

    await this.planProductModulePermissionRepository.create({
      plan_id,
      product_id,
      module_id: moduleProduct.module_id,
      plan_product_id: planProdustsRes._id,
      plan_product_module_id: planProductsModuleRes._id,
      module_permission_id: moduleProduct.module_permission_id,
    }); // inserting plan product module permission data
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

      let planRes = await this.planRepository.create(payloadPlan);

      if (payload.suite) {
        // if suites then looping through the suits consist of multiple product ids and inserting plan data

        planRes = await this.planRepository.findOneAndUpdate(
          { _id: planRes._id },
          { plan_products: [] }
        );
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const product_id of payload.suite) {
          const product = await this.productRepository.findOne({
            _id: product_id,
          });
          planRes = await this.planRepository.findOneAndUpdate(
            { _id: planRes._id },
            { plan_products: [...planRes.plan_products, product] }
          );
        }

        for (const product_id of payload.suite) {
          await this.savePlan(
            planRes._id,
            product_id,
            payload.plan_feature,
            payload.plan_module
          );
        }
      } else {
        // if single product then using product id, insert plan data
        const product = await this.productRepository.findOne({
          _id: payload.product_id,
        });
        await this.planRepository.findOneAndUpdate(
          { _id: planRes._id },
          { plan_products: [product] }
        );
        await this.savePlan(
          planRes._id,
          payload.product_id,
          payload.plan_feature,
          payload.plan_module
        );
      }

      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        planRes
      );
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }
}
