import { Module } from '@nestjs/common';
import { BuysService } from './buys.service';
import { BuysController } from './buys.controller';
import { usersProviders } from 'src/users/users.provider';
import { productsProviders } from 'src/products/products.provider';
import { buysProviders } from './buys.providers';

@Module({
  providers: [BuysService, ...buysProviders, ...usersProviders, ...productsProviders],
  controllers: [BuysController],
  exports: [BuysService]
})
export class BuysModule {}
