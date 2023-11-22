import { IBrand } from "./IBrand";
import { ICategories } from "./ICategories";

export interface IGood {
  id: number;
  name: string;
  main_img: string;
  price: number;
  description: string;
  secret: boolean;
  article: string;
  storage: number;
  brandId?: number;
  brand: IBrand;
  type: ICategories;
  typeId: number;
  imgs: string[];
}
