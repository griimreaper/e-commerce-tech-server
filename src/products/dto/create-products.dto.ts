export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
}
