import { Products } from './products.entity';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Products,
  },
];
