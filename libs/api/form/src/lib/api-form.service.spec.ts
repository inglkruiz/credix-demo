import { Test, TestingModule } from '@nestjs/testing';
import { ApiFormService } from './api-form.service';

describe.skip('ApiFormService', () => {
  let service: ApiFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFormService],
    }).compile();

    service = module.get<ApiFormService>(ApiFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
