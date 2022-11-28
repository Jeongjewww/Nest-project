import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ModesetList } from '../entities/modesetList.entity';

@CustomRepository(ModesetList)
export class ModesetListRepository extends Repository<ModesetList> {}
