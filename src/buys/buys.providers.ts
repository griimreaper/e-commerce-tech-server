import { Buys } from "./buys.entity";

export const buysProviders = [
  {
    provide: 'BUYS_REPOSITORY',
    useValue: Buys,
  },
];
