import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModesetList } from './entities/modesetList.entity';

@Injectable()
@QueryService(ModesetList)
export class ModesetService extends TypeOrmQueryService<ModesetList> {
  constructor(
    @InjectRepository(ModesetList)
    private modesetRepository: Repository<ModesetList>,
  ) {
    super(modesetRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<ModesetList[]> {
    return await this.modesetRepository.find();
  }
}
