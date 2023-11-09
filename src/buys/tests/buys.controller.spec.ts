import { Test, TestingModule } from '@nestjs/testing';
import { BuysController } from '../buys.controller';

describe('BuysController', () => {
  let controller: BuysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuysController],
    }).compile();

    controller = module.get<BuysController>(BuysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
