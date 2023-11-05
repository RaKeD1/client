import { AxiosResponse } from "axios";
import $api from "../http";
import { ISliderHome } from "../models/Slider/ISliderHome";

export default class SliderService {
  static async create(params: any) {
    console.log("params ", params);
    return $api.post("/sliderhome", params);
  }
  static async getAll(): Promise<AxiosResponse<ISliderHome>> {
    return $api.get("/sliderhome");
  }
  static async getActiveAll(): Promise<AxiosResponse<ISliderHome>> {
    return $api.get("/acitve-sliderhome");
  }
}
