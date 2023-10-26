export interface IAccount {
  email: string;
  password: string;
  id: string;
  roles: IRoles[];
  // confirmed: boolean;
}
export interface IRoles {
  id: string;
  name: string;
  description: string;
}
