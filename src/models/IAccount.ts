export interface IAccount {
  email: string;
  password: string;
  id: number;
  roles: IRoles[];
  // confirmed: boolean;
}
export interface IRoles {
  id: string;
  name: string;
  description: string;
}
