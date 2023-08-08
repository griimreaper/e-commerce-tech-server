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
    ) {}

  @Get()
  getAllProducts(@Query('page') page: string, @Query('quantity') quantity: string) {
    return this.productsService.findAll(Number(page), Number(quantity));
  }

  @Post()
  @UseInterceptors(FilesInterceptor('img', undefined, multerConfig))
  async createProduct(
    @Body() body: CreateProductDto,
    @UploadedFiles() img?: any, 
  ) {
    if (img) {
      const url = await this.fileService.createFiles(img);
      body = { ...body, img:url };
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
    if (img) {
      const url = await this.fileService.createFiles(img);
      return this.productsService.updateProduct(id, body, url);
    }
    return this.productsService.updateProduct(id, body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id:string) {
    return this.productsService.deleteProduct(id);
  }
}
