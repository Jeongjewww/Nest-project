import { Module } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './services/session.service';
import { TypeOrmExModule } from './typeorm-ex.module';

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
