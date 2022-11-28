import { Module } from '@nestjs/common';
import { LiveappController } from './controllers/liveapp.controller';
import { LiveappService } from './services/liveapp.service';

@Module({
  controllers: [LiveappController],
  providers: [LiveappService],
})
export class LiveappModule {}
