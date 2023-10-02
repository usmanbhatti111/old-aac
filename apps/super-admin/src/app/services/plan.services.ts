import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { AddPlanDto } from '@shared/dto';
import { PrismaService } from '@shared/services';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

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

      let planProdustsRes = null;
      let planProductsFeatureRes = null;
      let planProductsModuleRes = null;

      if (payload.suite) {
        for (const product_id of payload.suite) {
          // if suites then looping through the suits consist of multiple product ids and insert plan product data
          planProdustsRes = await this.prisma.planProduct.create({
            data: {
              plan_id: planRes.id,
              product_id,
            },
          });
          // if suites then looping through the suits consist of multiple product ids and inserting plan product features data
          const featureProduct = payload.plan_feature.find(
            (val) => (val.product_id = product_id)
          );
          planProductsFeatureRes = await this.prisma.planProductsFeature.create(
            {
              data: {
                plan_id: planRes.id,
                product_id,
                feature_id: featureProduct.feature_id,
                deals_associations_detail:
                  featureProduct?.dealsAssociationsDetail,
              },
            }
          );
          // if suites then looping through the suits consist of multiple product ids and inserting plan product module data
          const moduleProduct = payload.plan_module.find(
            (val) => (val.product_id = product_id)
          );
          planProductsModuleRes = await this.prisma.planProductsModule.create({
            data: {
              plan_id: planRes.id,
              product_id,
              module_id: moduleProduct.module_id,
              sub_module_id: moduleProduct?.sub_module_id,
              module_permission_id: moduleProduct?.module_permission_id,
              sub_module_permission_id: moduleProduct?.sub_module_permission_id,
            },
          });
        }
      } else {
        // if single product then using product id, insert plan product data
        planProdustsRes = await this.prisma.planProduct.create({
          data: {
            plan_id: planRes.id,
            product_id: payload.product_id,
          },
        });
        // if single product then using product id, insert plan product feature data
        const featureProduct = payload.plan_feature.find(
          (val) => (val.product_id = payload.product_id)
        );
        planProductsFeatureRes = await this.prisma.planProductsFeature.create({
          data: {
            plan_id: planRes.id,
            product_id: payload.product_id,
            feature_id: featureProduct?.feature_id,
            deals_associations_detail: featureProduct?.dealsAssociationsDetail,
          },
        });
        // if single product then using product id, insert plan product module data
        const moduleProduct = payload.plan_module.find(
          (val) => (val.product_id = payload.product_id)
        );
        planProductsModuleRes = await this.prisma.planProductsModule.create({
          data: {
            plan_id: planRes.id,
            product_id: payload.product_id,
            module_id: moduleProduct.module_id,
            sub_module_id: moduleProduct?.sub_module_id,
            module_permission_id: moduleProduct?.module_permission_id,
            sub_module_permission_id: moduleProduct?.sub_module_permission_id,
          },
        });
      }

      return successResponse(200, 'Success', {
        planRes,
        planProdustsRes,
        planProductsFeatureRes,
        planProductsModuleRes,
      });
    } catch (error) {
      console.log('eroorooror', error);
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }
}
