export interface IAccount {
  id_account: number;
  id_user: number;
  login: string;
  password: string;
  role_id: number;
  confirmed: boolean;
}
