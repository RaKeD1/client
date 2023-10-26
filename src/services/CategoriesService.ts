import $api from "../http";
export interface CreateTypeDto {
  type_name: string;
  parent?: number | null;
  img?: string;
}
export default class CategoriesService {
  static async create(params: CreateTypeDto) {
    console.log("params ", params);
    return $api.post("/types", params);
  }
  static async getAll(): Promise<void> {
    return $api.get("/types");
  }
}
