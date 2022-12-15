import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';
import { Repository } from 'typeorm';
import { CreateModesetDto } from './dto/create-modeset.dto';
import { UpdateModesetDto } from './dto/update-modeset.dto';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetList } from './entities/modesetList.entity';

@Injectable()
@QueryService(ModeAppId)
export class ModesetService extends TypeOrmQueryService<ModeAppId> {
  constructor(
    @InjectRepository(ModeAppId)
    private modeappRepository: Repository<ModeAppId>,
    @InjectRepository(ModesetList)
    private modesetlistRepository: Repository<ModesetList>,
  ) {
    super(modeappRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<ModeAppId[]> {
    // method1: typeorm relation
    // const modeset = await this.modeappRepository.find({
    //   relations: ['modeIds', 'sessionIds', 'serviceIds'],
    // });

    // method1-1. entity에 eager: true 추가 시, 바로 left join 가능
    // const modeset = await this.modeappRepository.find();
    // console.log(modeset);
    // return await modeset;

    const modeset = await this.modeappRepository.query(
      'SELECT *' +
        ' FROM modeset_list' +
        ' JOIN mode_app_id USING(modeId)' +
        ' LEFT JOIN session_server ON(session_server.sessionName = mode_app_id.`session`)' +
        ' LEFT JOIN service_server ON(service_server.serviceName = mode_app_id.`service`)',
    );
    console.log(modeset);
    return await modeset;
  }

  async create(allocateModeId, lives, modesetData: CreateModesetDto) {
    try {
      modesetData.modeId = allocateModeId; // modeId 값 지정
      await this.modesetlistRepository.save(modesetData);
      console.log(modesetData);

      var sql = 'INSERT INTO `mode_app_id`(`modeId`, `liveAppId`,`modeId_fk`)';

      // ModesetList의 liveAppId에 LiveAppId의 liveAppId값 6개 insert
      let modeAppList: ModeAppId[] = [];
      // lives[i].liveAppId => 'home', 'alaska', ...
      for (var i = 0; i < lives.length; i++) {
        var modeApp: ModeAppId = new ModeAppId();
        console.log('야 이거 돈다야 ');

        if (i == 0)
          sql +=
            'VALUES(' +
            modesetData.modeId +
            ', ' +
            lives[i].liveAppId +
            ', ' +
            modesetData.modeId +
            ')';
        else
          sql +=
            ',(' +
            modesetData.modeId +
            ', ' +
            lives[i].liveAppId +
            ', ' +
            modesetData.modeId +
            ')';
        // modeApp.modeId = modesetData.modeId;
        // modeApp.liveAppId = lives[i].liveAppId;
        // modeAppList.push(modeApp);
        await this.modeappRepository.save(modeApp);
      }
      console.log(sql);
      console.log(modeAppList);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('야 여기 에러났다 ! ');
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.modeappRepository.softDelete(id);
    } catch (err) {
      throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
        cause: new Error(),
        description: '데이터가 존재하지 않습니다.',
      });
    }
  }

  async update(updateData: UpdateModesetDto[]): Promise<void> {
    try {
      for (var i = 0; i < updateData.length; i++) {
        await this.modeappRepository.softDelete(updateData[i].id);
        await this.modeappRepository.save(updateData[i]);
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException('데이터를 수정할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }
}
