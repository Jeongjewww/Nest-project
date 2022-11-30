import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ModesetJson } from '../entities/modesetJson.entity';

@CustomRepository(ModesetJson)
export class ModesetJsonRepository extends Repository<ModesetJson> {}
