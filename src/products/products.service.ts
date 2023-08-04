import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Products } from './products.entity';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private serviceProducts: typeof Products,
  ) { }

  async createProduct(body: CreateProductDto): Promise<Products> {
    try {
      const { name } = body;
      const existingProduct = await this.serviceProducts.findOne({
        where: { name },
      });

      if (existingProduct) {
        throw new HttpException('El nombre ya está en uso', 400);
      }

      const newProduct = await this.serviceProducts.create({ ...body, isActive: true });
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

  async updateProduct(id: string, productData: CreateProductDto, img?: any): Promise<Products> {
    try {
      const product = await this.serviceProducts.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }

      const { name } = productData;

      if (name && name !== product.name) {
        const existingProduct = await this.serviceProducts.findOne({
          where: { name },
        });

        if (existingProduct) {
          throw new HttpException('El nuevo nombre ya está en uso', 400);
        }
      }

      product.name = name || product.name;
      product.description = productData.description || product.description;
      product.price = productData.price || product.price;
      product.quantity = productData.quantity || product.quantity;
      product.img = img || product.img;
      product.category = productData.category || product.category;

      await product.save();
      return product;
    } catch (error) {
      throw new HttpException('Error updating product', 500);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    let resultado = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indice);
    }

    try {
      const product = await this.serviceProducts.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }

      product.isActive = false;
      product.name = `Deleted_${product.name}_${resultado}`;
      await product.save();
      return 'Product eliminated';
    } catch (error) {
      throw new HttpException('Error deleting product', 500);
    }
  }
}
