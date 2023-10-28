import $api from "../http";
import { GoodsResponse } from "../models/response/GoodsResponse";
import { AxiosResponse } from "axios";
export interface CreateGoodDto {
  name: string;
  img?: string;
  price: number | string;
  storage: number | string;
  description?: string;
  secret: boolean;
  typeId: number;
  brandId: number;
}
export default class GoodService {
  static async create(params: CreateGoodDto) {
    console.log("params ", params);
    return $api.post("/goods", { ...params });
  }
  static async getAll(): Promise<AxiosResponse<GoodsResponse>> {
    return $api.get("/goods");
  }
}
