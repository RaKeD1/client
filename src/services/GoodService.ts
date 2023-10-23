import $api from "../http";
export interface CreateGoodDto {
  name: string;
  img?: string;
  price: number | string;
  storage: number | string;
  description: string;
  secret: boolean;
  type: string;
  brand: string;
}
export default class GoodService {
  static async create(params: CreateGoodDto) {
    console.log("params ", params);
    return $api.post("/goods", { ...params });
  }
  static async getAll(): Promise<void> {
    return $api.get("/goods");
  }
}
