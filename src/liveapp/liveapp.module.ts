import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { LiveappController } from './liveapp.controller';
import { LiveAppId } from './entities/LiveAppId.entity';
import { LiveAppRepository } from './repositories/liveapp.repository';
import { LiveappService } from './liveapp.service';
import { ModesetListRepository } from 'src/modeset/repositories/modeset.repository';
import { ModesetList } from 'src/modeset/entities/modesetList.entity';
import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import { ModeAppRepository } from 'src/modeset/repositories/modeapp.repository';
import { ModesetService } from 'src/modeset/modeset.service';
import { ModesetJson } from 'src/modeset/entities/modesetJson.entity';
import { ModesetJsonRepository } from 'src/modeset/repositories/modesetjson.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LiveAppId, ModesetList, ModeAppId, ModesetJson]),
    TypeOrmExModule.forCustomRepository([
      LiveAppRepository,
      ModesetListRepository,
      ModeAppRepository,
      ModesetJsonRepository,
    ]),
  ],
  controllers: [LiveappController],
  providers: [LiveappService, ModesetService],
  exports: [LiveappService],
})
export class LiveappModule {}
