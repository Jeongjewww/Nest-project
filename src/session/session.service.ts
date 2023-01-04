import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/session/entities/session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
@QueryService(Session)
export class SessionService extends TypeOrmQueryService<Session> {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {
    super(sessionRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<Session[]> {
    // const id: any = 32;
    // const data = await this.serviceRepository.query(
    //   'SELECT * FROM `service_server` WHERE id = ?',
    //   id,
    // );
    // console.log('이거 결과 값');
    // console.log(data);
    // console.log('this is result');
    const result = await this.sessionRepository.find();
    console.log(result);
    return result;
  }

  async create(sessionData: CreateSessionDto) {
    console.log(sessionData);
    try {
      await this.sessionRepository.save(sessionData);
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

  async delete(idList: string[]): Promise<void> {
    console.log(idList);
    for (const id in idList) {
      console.log(id, idList[id]);
      try {
        await this.sessionRepository.softDelete(idList[id]);
      } catch (err) {
        throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
          cause: new Error(),
          description: '데이터가 존재하지 않습니다.',
        });
      }
    }
  }

  // to-do: delete된 값에 대해서도 중복처리하는 데이터에 대해 delete data만 저장하는 table 따로 생성?
  async update(updateData: UpdateSessionDto[]): Promise<any> {
    try {
      // console.log(updateData.length);
      for (var i = 0; i < updateData.length; i++) {
        console.log(updateData[i].id, updateData[i]);
        await this.sessionRepository.softDelete(updateData[i].id);
        await this.sessionRepository.save(updateData[i]);
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
