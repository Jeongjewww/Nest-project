import { Session } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Service } from './service/entities/service.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE,
  entities: [Session, Service],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('initialize success');
  })
  .catch((error) => {
    console.error('initialize fail');
  });
