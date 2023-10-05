export class CreatePlanProductFeatureDto {
  plan_id: string;
  product_id: string;
  plan_product_id: string;
  feature_id: string;
  deals_associations_detail?: string;
  // Add other fields as needed
}
