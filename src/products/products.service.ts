import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private serviceProducts: typeof Products,
  ) {}

  async findAll(): Promise<Products[]> {
    try {
      const allProducts = await this.serviceProducts.findAll();
      return allProducts;
    } catch (error) {
      throw new HttpException('Error to try find products', 404);
    }
  }
}
