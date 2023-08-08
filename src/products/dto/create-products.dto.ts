export class CreateProductDto {
  id?: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  size: number;
  img: string | string[];
  isActive: boolean;
}
