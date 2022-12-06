import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { LiveappController } from './liveapp.controller';
import { LiveAppId } from './entities/LiveAppId.entity';
import { LiveAppRepository } from './repositories/liveapp.repository';
import { LiveappService } from './liveapp.service';
import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LiveAppId, ModeAppId]),
    TypeOrmExModule.forCustomRepository([LiveAppRepository]),
  ],
  controllers: [LiveappController],
  providers: [LiveappService],
  exports: [LiveappService],
})
export class LiveappModule {}
