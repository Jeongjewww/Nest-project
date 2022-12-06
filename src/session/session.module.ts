import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { SessionController } from './session.controller';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Session]),
    TypeOrmExModule.forCustomRepository([SessionRepository]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
