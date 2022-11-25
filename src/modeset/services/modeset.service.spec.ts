import { Test, TestingModule } from '@nestjs/testing';
import { ModesetService } from './modeset.service';

describe('ModesetService', () => {
  let service: ModesetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModesetService],
    }).compile();

    service = module.get<ModesetService>(ModesetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
