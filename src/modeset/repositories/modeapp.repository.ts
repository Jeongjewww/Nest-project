import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ModeAppId } from '../entities/modeAppId.entity';

@CustomRepository(ModeAppId)
export class ModeAppRepository extends Repository<ModeAppId> {}
