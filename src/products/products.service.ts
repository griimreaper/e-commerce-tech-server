import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Products } from './products.entity';
import { CreateProductDto } from './dto/create-products.dto';

export interface Paginate {
  page?: number;
  prevPage?: number;
  nextPage?: number;
  content: Products[];
}

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private serviceProducts: typeof Products,
  ) { }

  async createProduct(body: CreateProductDto): Promise<Products> {
    try {
      const { model } = body;

      const newProduct = await this.serviceProducts.create({ ...body, isActive: true });
      return newProduct;
    } catch (error) {
      throw new HttpException('Error creating product', 500);
    }
  }

  async findAll(page: number, quantity: number = 12, search?: string): Promise<Paginate> {
    try {
      let allProducts = await this.serviceProducts.findAll();
      const quantityOfPages = Math.floor(allProducts.length / quantity)

      if (page < 0 || page > quantityOfPages) { throw new HttpException('This page not exist.', 400) }
      if (search) allProducts = allProducts.filter((s) => (`${s.brand} ${s.model}`).toLowerCase().includes(search.toLowerCase()))

      return {
        prevPage: page === 0 ? null : page - 1,
        page,
        nextPage: page === quantityOfPages ? null : page + 1,
        content: allProducts.slice(page * quantity, (page + 1) * quantity)
      };
    } catch (error) {
      throw new HttpException(error.message, 404);
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

      const { model } = productData;

      if (model && model !== product.model) {
        const existingProduct = await this.serviceProducts.findOne({
          where: { model },
        });

        if (existingProduct) {
          throw new HttpException('El nuevo nombre ya está en uso', 400);
        }
      }

      product.model = model || product.model;
      product.description = productData.description || product.description;
      product.price = productData.price || product.price;
      product.size = productData.size || product.size;
      product.img = img || product.img;
      product.brand = productData.brand || product.brand;

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
      product.model = `Deleted_${product.model}_${resultado}`;
      await product.save();
      return 'Product eliminated';
    } catch (error) {
      throw new HttpException('Error deleting product', 500);
    }
  }

  async filterBy(body: CreateProductDto, page: number, quantity: number): Promise<Paginate> {
    try {
      let shoesData = await this.serviceProducts.findAll()
      const list = []

      for (const key of Object.keys(body)) {
        const value = body[key]
        if (value) list.push([key, value]);
      }

      const returned = (filters, dataFiltered = []) => {
        if (filters.length) {
          const [key, value] = filters.pop()

          dataFiltered = dataFiltered.filter((a) => {
            if (typeof value === 'string') return a[key].toLowerCase() === value.toLowerCase()
            return a[key] === value
          })

          return returned(filters, dataFiltered)
        } else {
          return dataFiltered
        }
      }

      const productsFiltered = returned(list, shoesData)
      const quantityOfPages = Math.floor(productsFiltered.length / quantity)

      if (page < 0 || page > quantityOfPages) { throw new HttpException('This page not exist.', 400) }

      return {
        prevPage: page === 0 ? null : page - 1,
        page,
        nextPage: page === quantityOfPages ? null : page + 1,
        content: productsFiltered.slice(page * quantity, (page + 1) * quantity)
      }

    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

}
