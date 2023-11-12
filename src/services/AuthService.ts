import { $auth } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $auth.post<AuthResponse>("/login", { email, password });
  }
  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $auth.post<AuthResponse>("/registration", { email, password });
  }
  static async logout(): Promise<void> {
    return $auth.post("/logout");
  }
  static async refresh() {
    //fixme сделать нормальную обработку promise
    return $auth.post("/refresh");
  }
}
