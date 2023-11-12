import $api from "../http";

export default class FeedBackService {
  static async create(params: any) {
    console.log("params ", params);
    return $api.post("/feedback", params);
  }
  static async getAll(): Promise<void> {
    return $api.get("/feedback");
  }
}
