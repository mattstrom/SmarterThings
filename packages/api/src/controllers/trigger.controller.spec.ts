import { Test, TestingModule } from '@nestjs/testing';
import { TriggerController } from './trigger.controller';

describe('Trigger Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TriggerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TriggerController = module.get<TriggerController>(TriggerController);
    expect(controller).toBeDefined();
  });
});
