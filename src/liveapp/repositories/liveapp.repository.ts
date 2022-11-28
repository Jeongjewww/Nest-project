import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { LiveAppId } from '../entities/LiveAppId.entity';

@CustomRepository(LiveAppId)
export class LiveAppRepository extends Repository<LiveAppId> {}
