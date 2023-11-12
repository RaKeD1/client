import $api from "../http";
export interface CreateTypeDto {
  brand_name: string;
  brand_logo?: string;
  description?: string | null;
  url?: string;
}
export interface PromiseFetchBrands {
  data: {
    brand_logo: null | string;
    brand_name: string;
    createdAt: string;
    description: string | null;
    id: number;
    updatedAt: string;
    url: number | null;
  };
}
export default class BrandsService {
  static async create(params: any) {
    console.log("params ", params);
    return $api.post("/brands", params);
  }
  static async getAll(): Promise<PromiseFetchBrands> {
    return $api.get("/brands");
  }
}
