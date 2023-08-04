import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.provider';
import { FileService } from 'src/file/file.service';

@Module({
  providers: [ProductsService, ...productsProviders, FileService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
