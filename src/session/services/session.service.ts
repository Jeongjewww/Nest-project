import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/session/entities/session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import {
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { UpdateSessionDto } from '../dto/update-session.dto';

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
    return await this.sessionRepository.find();
  }

  async create(sessionData: CreateSessionDto) {
    try {
      await this.sessionRepository.save(sessionData);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

  // delete = true -> save json file
  async delete(idList: string[]): Promise<void> {
    for (const id in idList) {
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

  // 수정 중
  async update(id: number[], updateData: UpdateSessionDto[]): Promise<void> {
    // for (var i = 0; i < queryData.id.length; i++) {
    //   try {
    //     await this.sessionRepository.save(updateData[i]);
    //   } catch (err) {
    //     if (err.code === 'ER_DUP_ENTRY') {
    //       throw new InternalServerErrorException(
    //         '데이터를 수정할 수 없습니다.',
    //         {
    //           cause: new Error(),
    //           description: '중복데이터가 존재합니다.',
    //         },
    //       );
    //     }
    //   }
    // }
  }
}
