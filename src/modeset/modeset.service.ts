import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateModesetDto } from './dto/create-modeset.dto';
import { UpdateModesetDto } from './dto/update-modeset.dto';
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

  // querybuilder relation join

  async getAll(): Promise<ModesetList[]> {
    return await this.modesetRepository.find();
  }

  async create(modesetData: CreateModesetDto) {
    try {
      await this.modesetRepository.save(modesetData);
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
        await this.modesetRepository.softDelete(idList[id]);
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
        await this.modesetRepository.softDelete(updateData[i].id);
        await this.modesetRepository.save(updateData[i]);
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
