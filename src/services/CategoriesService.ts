import $api from "../http";
export interface CreateTypeDto {
  type_name: string;
  parent?: number | null;
  img?: string;
}
interface PromiseFetchCategories {
  data: {
    createdAt: string;
    id: number;
    img: string | null;
    parent: number | null;
    type_name: string;
    updatedAt: string;
  };
}
export default class CategoriesService {
  static async create(params: CreateTypeDto) {
    console.log("params ", params);
    return $api.post("/types", params);
  }
  static async getAll(): Promise<PromiseFetchCategories> {
    return $api.get("/types");
  }
}
