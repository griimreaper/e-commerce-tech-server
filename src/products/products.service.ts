import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Products } from './products.entity';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private serviceProducts: typeof Products,
  ) {}

  async createProduct(body: CreateProductDto): Promise<Products> {
    try {
      const { name } = body;
      const existingProduct = await this.serviceProducts.findOne({
        where: { name },
      });

      if (existingProduct) {
        throw new HttpException('El nombre ya está en uso', 400);
      }

      const newProduct = await this.serviceProducts.create(body);
      return newProduct;
    } catch (error) {
      throw new HttpException('Error creating product', 500);
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      const allProducts = await this.serviceProducts.findAll();
      return allProducts;
    } catch (error) {
      throw new HttpException('Error finding products', 404);
    }
  }

  async findOne(id: number): Promise<Products> {
    try {
      const product = await this.serviceProducts.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }
      return product;
    } catch (error) {
      throw new HttpException('Error finding the product', 404);
    }
  }

  async updateProduct(id: number, productData: UpdateProductDto): Promise<Products> {
    try {
      const product = await this.serviceProducts.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }

      if (productData.name && productData.name !== product.name) {
        const existingProduct = await this.serviceProducts.findOne({
          where: { name: productData.name },
        });

        if (existingProduct) {
          throw new HttpException('El nuevo nombre ya está en uso', 400);
        }
      }

      await product.update(productData);
      return product;
    } catch (error) {
      throw new HttpException('Error updating product', 500);
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const product = await this.serviceProducts.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }
      await product.destroy();
    } catch (error) {
      throw new HttpException('Error deleting product', 500);
    }
  }
}
