export class CreateUserDto {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
  isActive: boolean;
}
