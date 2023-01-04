import { appDataSource } from './datasource';
import { ModeAppId } from './modeset/entities/modeAppId.entity';
import { ModesetList } from './modeset/entities/modesetList.entity';

export class ModesetResolver {
  modeset = appDataSource.getRepository(ModesetList);
  modeapp = appDataSource.getRepository(ModeAppId);
}
