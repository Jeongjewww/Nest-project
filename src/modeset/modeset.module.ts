import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ModesetController } from './controllers/modeset.controller';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetJson } from './entities/modesetJson.entity';
import { ModesetList } from './entities/modesetList.entity';
import { ModeAppRepository } from './repositories/modeapp.repository';
import { ModesetListRepository } from './repositories/modeset.repository';
import { ModesetJsonRepository } from './repositories/modesetjson.repository';
import { ModesetService } from './services/modeset.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ModesetList, ModeAppId, ModesetJson]),
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
