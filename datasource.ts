import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';
import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import { ModesetJson } from 'src/modeset/entities/modesetJson.entity';
import { ModesetList } from 'src/modeset/entities/modesetList.entity';
import { Service } from 'src/service/entities/service.entity';
import { Session } from 'src/session/entities/session.entity';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE,
  entities: [Session, Service, LiveAppId, ModesetList, ModeAppId, ModesetJson],
  synchronize: false,
  logging: true,
});

appDataSource.initialize();
