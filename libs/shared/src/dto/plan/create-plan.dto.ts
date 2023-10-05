export class CreatePlanDto {
  description?: string;
  default_users: number;
  default_storage: number;
  plan_price: number;
  additional_per_user_price?: number;
  additional_storage_price?: number;
  plan_type_id: string;
  plan_product: string[]; // Assuming it's an array of PlanProduct _id references
  is_active: boolean;
}
