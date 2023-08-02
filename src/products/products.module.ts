import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.provider';

@Module({
  providers: [ProductsService, ...productsProviders],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
