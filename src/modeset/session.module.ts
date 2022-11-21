import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './services/session.service';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([SessionRepository])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
