export interface ICategory {
  name: string;
  description: string;
  is_deleted: boolean;
  is_dev: boolean;
  _id?: string;
  product_count: number;
}
