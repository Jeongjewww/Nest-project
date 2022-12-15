import { appDataSource } from './datasource';
import { ModesetList } from './modeset/entities/modesetList.entity';
import { ServiceRepository } from './service/repositories/service.repository';
import { SessionRepository } from './session/repositories/session.repository';

export class ModesetResolver {
  modeset = appDataSource.getRepository(ModesetList);
}

export class SessionResolver {
  session = appDataSource.getRepository(SessionRepository);
}

export class ServiceResolver {
  service = appDataSource.getRepository(ServiceRepository);
}
