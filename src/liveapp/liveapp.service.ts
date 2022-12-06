import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLiveAppDto } from './dto/create-liveapp.dto';
import { UpdateLiveAppDto } from './dto/update-liveapp.dto';
import { LiveAppId } from './entities/LiveAppId.entity';

@Injectable()
@QueryService(LiveAppId)
export class LiveappService extends TypeOrmQueryService<LiveAppId> {
  constructor(
    @InjectRepository(LiveAppId)
    private LiveAppRepository: Repository<LiveAppId>,
  ) {
    super(LiveAppRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<LiveAppId[]> {
    return await this.LiveAppRepository.find();
  }

  // publicAppUrl: `session_server`의 privateIp, privatePort
  // privateAppUrl: `session_server`의 publicIp, publicPort
  async create(liveData: CreateLiveAppDto): Promise<void> {
    try {
      await this.LiveAppRepository.save(liveData);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

  async delete(idList: string[]): Promise<void> {
    for (const id in idList) {
      try {
        await this.LiveAppRepository.softDelete(idList[id]);
      } catch (err) {
        throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
          cause: new Error(),
          description: '데이터가 존재하지 않습니다.',
        });
      }
    }
  }

  // Live App Id 페이지에 update 기능이 필요한지
  async update(updateData: UpdateLiveAppDto[]): Promise<void> {
    try {
      for (var i = 0; i < updateData.length; i++) {
        await this.LiveAppRepository.softDelete(updateData[i].id);
        await this.LiveAppRepository.save(updateData[i]);
      }
    } catch (err) {
      if (err.cod === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException('데이터를 수정할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }
}
