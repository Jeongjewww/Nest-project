import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmExModule } from './typeorm-ex.module';
import { SessionRepository } from './session/repositories/session.repository';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ServiceModule } from './service/service.module';
import { ModesetModule } from './modeset/modeset.module';
import { ServiceRepository } from './service/repositories/service.repository';
import { Session } from './session/entities/session.entity';
import { Service } from './service/entities/service.entity';
import { LiveappModule } from './liveapp/liveapp.module';
import { LiveAppRepository } from './liveapp/repositories/liveapp.repository';
import { ModesetListRepository } from './modeset/repositories/modeset.repository';
import { ModeAppRepository } from './modeset/repositories/modeapp.repository';
import { LiveAppId } from './liveapp/entities/LiveAppId.entity';
import { ModesetList } from './modeset/entities/modesetList.entity';
import { ModeAppId } from './modeset/entities/modeAppId.entity';
import { ModesetJson } from './modeset/entities/modesetJson.entity';
import { ModesetJsonRepository } from './modeset/repositories/modesetjson.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
      entities: [
        Session,
        Service,
        LiveAppId,
        ModesetList,
        ModeAppId,
        ModesetJson,
      ],
      synchronize: false,
      logging: true,
    }),
    TypeOrmExModule.forCustomRepository([
      SessionRepository,
      ServiceRepository,
      LiveAppRepository,
      ModesetListRepository,
      ModeAppRepository,
      ModesetJsonRepository,
    ]),
    SessionModule,
    ServiceModule,
    ModesetModule,
    LiveappModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
