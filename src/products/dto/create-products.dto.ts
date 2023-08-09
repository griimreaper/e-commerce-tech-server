export class CreateProductDto {
  id?: string;
  brand?: string;
  model?: string;
  description?: string;
  price?: number;
  size?: number;
  color?: string;
  img?: string | string[];
  isActive?: boolean;
}
