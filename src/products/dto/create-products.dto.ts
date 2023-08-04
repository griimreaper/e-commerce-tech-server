export class CreateProductDto {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  img: string | string[];
  category: string;
  isActive: boolean;
}
