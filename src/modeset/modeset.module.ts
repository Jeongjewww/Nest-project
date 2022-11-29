import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ModesetController } from './controllers/modeset.controller';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetList } from './entities/modesetList.entity';
import { ModeAppRepository } from './repositories/modeapp.repository';
import { ModesetListRepository } from './repositories/modeset.repository';
import { ModesetService } from './services/modeset.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ModesetList, ModeAppId]),
    TypeOrmExModule.forCustomRepository([
      ModesetListRepository,
      ModeAppRepository,
    ]),
  ],
  controllers: [ModesetController],
  providers: [ModesetService],
})
export class ModesetModule {}
