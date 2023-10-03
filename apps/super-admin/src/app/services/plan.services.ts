import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import {
  AddPlanDto,
  PaginationDto,
  ProductFeatureDto,
  ProductModuleDto,
} from '@shared/dto';
import { PrismaService } from '@shared/services';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async getPlans(payload: PaginationDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;
      const data = await this.prisma.plan.findMany({
        skip,
        take,
        include: { plan_product: true, plan_type: true },
      });
      console.log('this is payload', payload);
      return successResponse(200, 'Success', data);
    } catch (error) {
      console.log('error in get plans', error);
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }

  async savePlan(
    plan_id: string,
    product_id: string,
    featureProducts: ProductFeatureDto[],
    moduleProducts: ProductModuleDto[]
  ) {
    const planProdustsRes = await this.prisma.planProduct.create({
      data: {
        plan_id,
        product_id,
      },
    });

    const featureProduct = featureProducts.find(
      (val) => (val.product_id = product_id)
    );
    const moduleProduct = moduleProducts.find(
      (val) => (val.product_id = product_id)
    );

    // inserting plan product features data
    await this.prisma.planProductFeature.create({
      data: {
        plan_id,
        product_id,
        plan_product_id: planProdustsRes.id,
        feature_id: featureProduct.feature_id,
        deals_associations_detail: featureProduct?.deals_associations_detail,
      },
    });
    // inserting plan product module data
    const planProductsModuleRes = await this.prisma.planProductModule.create({
      data: {
        plan_id,
        product_id,
        module_id: moduleProduct.module_id,
        plan_product_id: planProdustsRes.id,
      },
    });
    // inserting plan product module permission data
    await this.prisma.planProductModulePermission.create({
      data: {
        plan_id,
        product_id,
        module_id: moduleProduct.module_id,
        plan_product_id: planProdustsRes.id,
        plan_product_module_id: planProductsModuleRes.id,
        module_permission_id: moduleProduct.module_permission_id,
      },
    });
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
      const planRes = await this.prisma.plan.create({
        data: payloadPlan,
      });

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
