import { DataSource } from 'typeorm';
import { LiveAppId } from './liveapp/entities/LiveAppId.entity';
import { ModeAppId } from './modeset/entities/modeAppId.entity';
import { ModesetJson } from './modeset/entities/modesetJson.entity';
import { ModesetList } from './modeset/entities/modesetList.entity';
import { Service } from './service/entities/service.entity';
import { Session } from './session/entities/session.entity';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: '3.38.240.171',
  port: 3306,
  username: 'modeset',
  password: 'imsi00!!',
  database: 'modeset',
  entities: [Session, Service, LiveAppId, ModesetList, ModeAppId, ModesetJson],
  synchronize: true,
  logging: true,
});

appDataSource.initialize();
