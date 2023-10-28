export interface IGood {
  id: number;
  good_name: string;
  img: string;
  price: number;
  description: string;
  secret: boolean;
  article: string;
  storage: number;
  brandId?: number;
  typeId: number;
}
