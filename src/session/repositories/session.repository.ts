import { Session } from 'inspector';
import { Repository } from 'typeorm';
import { CustomRepository } from '../typeorm-ex.decorator';

@CustomRepository(Session)
export class SessionRepository extends Repository<Session> {}
