export interface IUser {
    id: number;
    name: string;
    email: string;
    fullname: string;
    adress: string | null;
    phone: number;
    company: string;
    post: string; //Должность
}