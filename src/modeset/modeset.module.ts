import { Module } from '@nestjs/common';
import { ModesetController } from './controllers/modeset.controller';
import { ModesetService } from './services/modeset.service';

@Module({
  controllers: [ModesetController],
  providers: [ModesetService],
})
export class ModesetModule {}
