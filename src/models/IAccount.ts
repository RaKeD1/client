export interface IAccount {
  // id_account: number;
  // id_user: number;
  // login: string;
  email: string;
  password: string;
  id: string;
  roles: IRoles[];
  // role_id: number;
  // confirmed: boolean;
}
export interface IRoles {
  id: string;
  name: string;
  description: string;
}
