import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-products.dto';
import { multerConfig } from 'src/file/multer.config';
import { FileService } from 'src/file/file.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private readonly fileService: FileService,
  ) { }

  @Get('detail/:id')
  async getOneProduct(
    @Param('id') id: string,
  ) {
    console.log(id)
    return this.productsService.findOne(id)
  }
  @Get('get/')
  getAllProducts(
    @Query('page') page: string,
    @Query('quantity') quantity: string,
    @Query('search') search: string,
  ) {
    return this.productsService.findAll(Number(page), Number(quantity), search);
  }

  @Get('/datafake')
  getFakeData() {
    return this.productsService.generateData();
  }
  @Post()
  @UseInterceptors(FilesInterceptor('img', undefined, multerConfig))
  async createProduct(
    @Body() body: CreateProductDto,
    @UploadedFiles() img?: any,
  ) {
    if (img) {
      const url = await this.fileService.createFiles(img);
      body = { ...body, img: url };
    }
    return this.productsService.createProduct(body);
  }

  @Patch('update/:id')
  @UseInterceptors(FilesInterceptor('img', undefined, multerConfig))
  async updateProduct(
    @Body() body: CreateProductDto,
    @Param('id') id: string,
    @UploadedFiles() img?: any,
  ) {

    if (img.length) {
      const url = await this.fileService.createFiles(img);
      return this.productsService.updateProduct(id, body, url);
    }
    return this.productsService.updateProduct(id, body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get('filter')
  filterBy(
    @Query('brand') brand?: string,
    @Query('model') model?: string,
    @Query('color') color?: string,
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('quantity') quantity?: string
  ) {
    const body = { brand, model, color, size: Number(size) }
    return this.productsService.filterBy(body, Number(page), Number(quantity))
  }
}
