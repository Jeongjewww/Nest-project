import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/session/entities/session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async getAll(): Promise<Session[]> {
    return await this.sessionRepository.find();
  }

  async getOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOneBy({ id });
    if (!session) {
      throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
    }
    return session;
  }

  // 중복데이터 생성 validation 추가
  async create(sessionData: CreateSessionDto) {
    const newSession = this.sessionRepository.create(sessionData);

    await this.sessionRepository.save(newSession);
  }

  async delete(queryData: string[]): Promise<void> {
    for (const data in queryData) {
      if (!queryData[data]) {
        throw new NotFoundException(
          `${queryData[data]}번 세션서버 정보가 존재하지 않습니다.`,
        );
      } else {
        await this.sessionRepository.delete(queryData[data]);
      }
    }
  }

  // unique value validation
  // async update(queryData: any, updateData: UpdateSessionDto): Promise<void> {
  //   for (var i = 0; i < queryData.id.length; i++) {

  //     const updateSession = updateData;
  //     await this.sessionRepository.save(updateData);
  //   }

  // const updateSession = await this.getOne(id);

  // if (!updateSession) {
  //   throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
  // } else {
  //   await this.sessionRepository.save(updateData);
  // }
  // }
}
