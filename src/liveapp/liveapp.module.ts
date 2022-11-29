import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { LiveappController } from './controllers/liveapp.controller';
import { LiveAppId } from './entities/LiveAppId.entity';
import { LiveAppRepository } from './repositories/liveapp.repository';
import { LiveappService } from './services/liveapp.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LiveAppId]),
    TypeOrmExModule.forCustomRepository([LiveAppRepository]),
  ],
  controllers: [LiveappController],
  providers: [LiveappService],
  exports: [LiveappService],
})
export class LiveappModule {}
