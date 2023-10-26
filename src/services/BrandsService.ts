import $api from "../http";
export interface CreateTypeDto {
  brand_name: string;
  brand_logo?: string;
  description?: string | null;
  url?: string;
}
export default class BrandsService {
  static async create(params: CreateTypeDto) {
    console.log("params ", params);
    return $api.post("/brands", params);
  }
  static async getAll(): Promise<void> {
    return $api.get("/brands");
  }
}
