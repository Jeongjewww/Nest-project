import { Test, TestingModule } from '@nestjs/testing';
import { LiveappService } from './liveapp.service';

describe('LiveappService', () => {
  let service: LiveappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveappService],
    }).compile();

    service = module.get<LiveappService>(LiveappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
