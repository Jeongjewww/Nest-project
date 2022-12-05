import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ServiceController } from './controllers/service.controller';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './repositories/service.repository';
import { ServiceService } from './services/service.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Service]),
    TypeOrmExModule.forCustomRepository([ServiceRepository]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService, ServiceModule],
})
export class ServiceModule {}
