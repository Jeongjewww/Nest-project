import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModesetDto } from 'src/modeset/dto/create-modeset.dto';
import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import { ModesetList } from 'src/modeset/entities/modesetList.entity';
import { ModesetService } from 'src/modeset/modeset.service';
import { In, Repository } from 'typeorm';
import { CreateLiveAppDto } from './dto/create-liveapp.dto';
import { UpdateLiveAppDto } from './dto/update-liveapp.dto';
import { LiveAppId } from './entities/LiveAppId.entity';

@Injectable()
@QueryService(LiveAppId)
export class LiveappService extends TypeOrmQueryService<LiveAppId> {
  constructor(
    private readonly modesetService: ModesetService,
    @InjectRepository(LiveAppId)
    private LiveAppRepository: Repository<LiveAppId>,
    @InjectRepository(ModesetList)
    private modesetRepository: Repository<ModesetList>,
    @InjectRepository(ModeAppId)
    private modeappRepository: Repository<ModeAppId>,
  ) {
    super(LiveAppRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<LiveAppId[]> {
    return await this.LiveAppRepository.find();
  }
  async getLiveAll(): Promise<LiveAppId[]> {
    return await this.LiveAppRepository.find();
  }
  async getLiveOne(id): Promise<LiveAppId> {
    return await this.LiveAppRepository.findOne(id);
  }
  async create(liveData: CreateLiveAppDto): Promise<void> {
    try {
      var modeAppIds: ModesetList[] = [];
      modeAppIds = await this.modesetRepository.find();

      await this.LiveAppRepository.save(liveData);

      var lives = await this.getAll();
      var oneLive: any = [];
      oneLive.push(lives[lives.length - 1]);

      for (var i = 0; i < modeAppIds.length; i++) {
        const newD = new CreateModesetDto();
        newD.modeId = modeAppIds[i].modeId;
        newD.modeName = modeAppIds[i].modeName;
        this.modesetService.create(oneLive, newD, 0);
      }
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
        await this.LiveAppRepository.delete(idList[id]);
      } catch (err) {
        throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
          cause: new Error(),
          description: '데이터가 존재하지 않습니다.',
        });
      }
    }
  }

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
