import { Test, TestingModule } from '@nestjs/testing';
import { ModesetController } from './modeset.controller';

describe('ModesetController', () => {
  let controller: ModesetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModesetController],
    }).compile();

    controller = module.get<ModesetController>(ModesetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
