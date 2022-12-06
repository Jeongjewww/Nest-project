import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ModesetController } from './modeset.controller';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetJson } from './entities/modesetJson.entity';
import { ModesetList } from './entities/modesetList.entity';
import { ModeAppRepository } from './repositories/modeapp.repository';
import { ModesetListRepository } from './repositories/modeset.repository';
import { ModesetJsonRepository } from './repositories/modesetjson.repository';
import { ModesetService } from './modeset.service';
import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ModesetList, ModeAppId, ModesetJson, LiveAppId]),
    TypeOrmExModule.forCustomRepository([
      ModesetListRepository,
      ModeAppRepository,
      ModesetJsonRepository,
    ]),
  ],
  controllers: [ModesetController],
  providers: [ModesetService],
  exports: [ModesetService],
})
export class ModesetModule {}
