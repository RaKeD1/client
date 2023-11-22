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
  imgs: File[];
  main_img: File[];
}
export default class GoodService {
  static async create(params: any) {
    console.log("params ", params);
    return $api.post("/goods", params);
  }
  static async getAll(): Promise<AxiosResponse<GoodsResponse>> {
    return $api.get("/goods");
  }
  static async deleteGood(id: number) {
    return $api.delete("/goods/" + id);
  }
}
