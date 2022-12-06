import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetList } from './entities/modesetList.entity';

@Injectable()
@QueryService(ModesetList)
@QueryService(ModeAppId)
export class ModesetService extends TypeOrmQueryService<any> {
  // constructor(
  //     @Injectable(ModesetList) private ModesetListRepository: Repository<ModesetList>,
  //     @Injectable(ModeAppId) private ModeAppRepository: Repository<ModeAppId>
  // ){super(ModesetListRepository, ModeAppRepository, {this.useSoftDelete})}
}
