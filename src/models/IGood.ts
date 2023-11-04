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
  typeId: number;
  imgs: string[];
}
