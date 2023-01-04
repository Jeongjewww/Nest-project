import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModesetResolver } from 'src/resolver';
import { Repository } from 'typeorm';
import { CreateModesetDto } from './dto/create-modeset.dto';
import { UpdateModesetDto } from './dto/update-modeset.dto';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetJson } from './entities/modesetJson.entity';
import { ModesetList } from './entities/modesetList.entity';

@Injectable()
@QueryService(ModeAppId)
export class ModesetService extends TypeOrmQueryService<ModeAppId> {
  constructor(
    @InjectRepository(ModeAppId)
    private modeappRepository: Repository<ModeAppId>,
    @InjectRepository(ModesetList)
    private modesetlistRepository: Repository<ModesetList>,
    @InjectRepository(ModesetJson)
    private modesetJsonRepository: Repository<ModesetJson>,
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
      'SELECT ma.`id`, `modeId`, `modeName`, `desc`, `liveAppId`, `modeAppId`, `debug`, `publicSession`, `privateSession`, `publicService`, `privateService`' +
        ' FROM modeset_list ml' +
        ' JOIN mode_app_id ma USING(modeId)' +
        ' LEFT JOIN session_server session1 ON (session1.sessionName = ma.`publicSession`)' +
        ' LEFT JOIN session_server session2 ON (session2.sessionName = ma.`privateSession`)' +
        ' LEFT JOIN service_server service1 ON (service1.serviceName = ma.`publicService`)' +
        ' LEFT JOIN service_server service2 ON (service2.serviceName = ma.`privateService`)' +
        ' WHERE ml.`deletedAt` IS NULL AND ma.`deletedAt` IS NULL' +
        ' ORDER BY ma.`modeId`, ma.`liveAppId`;',
    );
    console.log(modeset);
    return await modeset;
  }

  async getJson(): Promise<ModesetJson[]> {
    return await this.modesetJsonRepository.find();
  }

  async create(lives: any, modesetData: CreateModesetDto, mode: number) {
    try {
      if (mode == 1) await this.modesetlistRepository.save(modesetData);

      // ModesetList의 liveAppId에 LiveAppId의 liveAppId값 6개 insert
      let modeAppList: ModeAppId[] = [];
      for (var i = 0; i < lives.length; i++) {
        var modeApp: ModeAppId = new ModeAppId();

        modeApp.modeId = modesetData.modeId;
        modeApp.liveAppId = lives[i].liveAppId;
        modeApp.liveApps = lives[i].id;
        modeAppList.push(modeApp);
        // console.log(modeAppList);

        await this.modeappRepository.save(modeAppList[i]);
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('중복데이터가 존재하여 데이터를 추가할 수 없습니다.');
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

  async delete(data: Object[]): Promise<void> {
    var t = new ModesetResolver();

    for (var i = 0; i < data.length; i++) {
      try {
        await t.modeset
          .createQueryBuilder('modeset_list')
          .softDelete()
          .where('modeId = :modeId', { modeId: data[i] })
          .execute();

        await t.modeapp
          .createQueryBuilder('mode_app_id')
          .softDelete()
          .where('modeId = :modeId', { modeId: data[i] })
          .execute();
      } catch (err) {
        throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
          cause: new Error(),
          description: '데이터가 존재하지 않습니다.',
        });
      }
    }
  }

  async update(updateData: UpdateModesetDto[]): Promise<void> {
    try {
      for (var i = 0; i < updateData.length; i++) {
        await this.modeappRepository.softDelete(updateData[i].id);
        delete updateData[i].id;
        await this.modeappRepository.save(updateData[i]);
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('중복데이터가 존재하여 데이터를 수정할 수 없습니다.');
        throw new InternalServerErrorException('데이터를 수정할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }
}
