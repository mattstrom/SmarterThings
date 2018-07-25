import { Test, TestingModule } from '@nestjs/testing';
import { SeuritySystemController } from './seurity-system.controller';

describe('SeuritySystem Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SeuritySystemController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SeuritySystemController = module.get<SeuritySystemController>(SeuritySystemController);
    expect(controller).toBeDefined();
  });
});
