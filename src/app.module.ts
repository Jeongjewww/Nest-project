import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { Session } from './session/entities/session.entity';
import { ConfigModule } from '@nestjs/config';

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
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
