import { Test, TestingModule } from '@nestjs/testing';
import { ApiFormController } from './api-form.controller';

describe.skip('ApiFormService', () => {
  let controller: ApiFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiFormController],
    }).compile();

    controller = module.get<ApiFormController>(ApiFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
