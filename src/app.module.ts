import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { Session } from './session/entities/session.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmExModule } from './session/typeorm-ex.module';
import { SessionRepository } from './session/repositories/session.repository';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    SessionModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
      entities: [Session],
      synchronize: false,
      logging: true,
    }),
    TypeOrmExModule.forCustomRepository([SessionRepository]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
