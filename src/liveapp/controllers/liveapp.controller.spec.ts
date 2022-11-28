import { Test, TestingModule } from '@nestjs/testing';
import { LiveappController } from './liveapp.controller';

describe('LiveappController', () => {
  let controller: LiveappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveappController],
    }).compile();

    controller = module.get<LiveappController>(LiveappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
