import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

@CustomRepository(Service)
export class ServiceRepository extends Repository<Service> {}
