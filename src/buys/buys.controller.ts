import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuysService } from './buys.service';
import { BuysDto } from './dto/BuysDto';

@Controller('buys')
export class BuysController {
    constructor(
        private readonly buysService: BuysService
    ) {}

  @Get()
  getBuys () {
    return this.buysService.getBuys()
  }

  @Post('buy')
  buyingProduct (@Body() body: BuysDto) {
    return this.buysService.buyProduct(body)
  }
}
