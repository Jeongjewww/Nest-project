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
import { Session } from 'src/session/entities/session.entity';
import { Service } from 'src/service/entities/service.entity';
import { LiveappService } from 'src/liveapp/liveapp.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      ModesetList,
      ModesetJson,
      Session,
      Service,
      ModeAppId,
      LiveAppId,
    ]),
    TypeOrmExModule.forCustomRepository([
      ModesetListRepository,
      ModeAppRepository,
      ModesetJsonRepository,
    ]),
  ],
  controllers: [ModesetController],
  providers: [ModesetService, LiveappService],
  exports: [ModesetService],
})
export class ModesetModule {}
