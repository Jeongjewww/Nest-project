import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmExModule } from './typeorm-ex.module';
import { SessionRepository } from './session/repositories/session.repository';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ormConfig } from './orm.config';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    SessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    TypeOrmExModule.forCustomRepository([SessionRepository]),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
