import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCHRONIZE: false,
    ENTITIES: [__dirname + '/session/entities//*.entity{.ts,.js}'],
    MIGRATIONS_TABLE_NAME: 'migrations',
    MIGRATIONS: [__dirname + '/src/migrations/**/*{.ts,.js}'],
    // CLI: {
    //   migrationsDir: 'src/migrations',
    // },
    MIGRATIONS_RUN: false,
  };

  const ormconfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_DATABASE,
    synchronize: commonConf.SYNCHRONIZE,
    logging: true,
    entities: commonConf.ENTITIES,
    migrationsTableName: commonConf.MIGRATIONS_TABLE_NAME,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
    // cli: commonConf.CLI,
  };

  return ormconfig;
}

export { ormConfig };
