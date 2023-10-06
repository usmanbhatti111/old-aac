import { Injectable } from '@nestjs/common';
import { MODEL, errorResponse, successResponse } from '@shared/constants';
import {
  AddPlanDto,
  EditPlanDto,
  PaginationDto,
  ProductFeatureDto,
  ProductModuleDto,
} from '@shared/dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Plan,
  PlanDocument,
  PlanProduct,
  PlanProductDocument,
  PlanProductFeature,
  PlanProductFeatureDocument,
  PlanProductModule,
  PlanProductModuleDocument,
  PlanProductModulePermission,
  PlanProductModulePermissionDocument,
} from '@shared/schemas';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
    @InjectModel(PlanProduct.name)
    private planProductModel: Model<PlanProductDocument>,
    @InjectModel(PlanProductFeature.name)
    private planProductFeatureModel: Model<PlanProductFeatureDocument>,
    @InjectModel(PlanProductModule.name)
    private planProductModuleModel: Model<PlanProductModuleDocument>,
    @InjectModel(PlanProductModulePermission.name)
    private planProductModulePermissionModel: Model<PlanProductModulePermissionDocument>
  ) { }

  async getPlans(payload: PaginationDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      const data = await this.planModel
        .find()
        .skip(skip)
        .limit(take)
        .populate({
          path: 'plan_type_id', // The field to populate
          select: 'name', // Optionally, select specific fields from the populated document
          model: MODEL.PLAN_TYPE, // The model to use for population
          options: { lean: true }, // Any additional options you want to apply
          // Alias the populated field as 'custom_plan_type'
          //populate: { path: 'plan_types', model: MODEL.PLAN_TYPE },
        })
        .exec();

      // const data = await this.planModel.aggregate([
      //   { $skip: skip }, // Skip documents
      //   { $limit: take }, // Limit the number of documents
      //   // Populate the 'plan_type' field
      //   {
      //     $lookup: {
      //       from: MODEL.PLAN_TYPE,
      //       localField: 'plan_type_id',
      //       foreignField: '_id',
      //       as: 'plan_type',
      //     },
      //   },
      // ]).exec();
      return successResponse(200, 'Success', data);
    } catch (error) {
      console.log('errrr', error);
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }

  async editPlan(payload: EditPlanDto) {
    try {
      console.log('edit plan payload', payload)
      return successResponse(200, 'Success', {});
    } catch (error) {
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }

  async savePlan(
    plan_id: string,
    product_id: string,
    featureProducts: ProductFeatureDto[],
    moduleProducts: ProductModuleDto[]
  ) {
    const createdplanProduct = new this.planProductModel({
      plan_id,
      product_id,
    });
    const planProdustsRes = await createdplanProduct.save();

    const featureProduct = featureProducts.find(
      (val) => (val.product_id = product_id)
    );
    const moduleProduct = moduleProducts.find(
      (val) => (val.product_id = product_id)
    );

    const createdPlanProductFeature = new this.planProductFeatureModel({
      plan_id,
      product_id,
      plan_product_id: planProdustsRes.id,
      feature_id: featureProduct.feature_id,
      deals_associations_detail: featureProduct?.deals_associations_detail,
    });
    await createdPlanProductFeature.save(); // inserting plan product features data

    const createdPlanProductModule = new this.planProductModuleModel({
      plan_id,
      product_id,
      module_id: moduleProduct.module_id,
      plan_product_id: planProdustsRes.id,
    });
    const planProductsModuleRes = await createdPlanProductModule.save(); // inserting plan product module data

    const createdPlanProductModulePermission =
      new this.planProductModulePermissionModel({
        plan_id,
        product_id,
        module_id: moduleProduct.module_id,
        plan_product_id: planProdustsRes.id,
        plan_product_module_id: planProductsModuleRes.id,
        module_permission_id: moduleProduct.module_permission_id,
      });
    await createdPlanProductModulePermission.save(); // inserting plan product module permission data
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

      const createdplan = new this.planModel(payloadPlan);
      const planRes = await createdplan.save();

      if (payload.suite) {
        // if suites then looping through the suits consist of multiple product ids and inserting plan data
        for (const product_id of payload.suite) {
          await this.savePlan(
            planRes.id,
            product_id,
            payload.plan_feature,
            payload.plan_module
          );
        }
      } else {
        // if single product then using product id, insert plan data
        await this.savePlan(
          planRes.id,
          payload.product_id,
          payload.plan_feature,
          payload.plan_module
        );
      }

      return successResponse(200, 'Success', planRes);
    } catch (error) {
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }
}
