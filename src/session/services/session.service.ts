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

  async create(sessionData: CreateSessionDto) {
    const newSession = this.sessionRepository.create(sessionData);

    await this.sessionRepository.save(newSession);
  }

  // 추가: delete값을 1로 바꿔주기
  async delete(id: number): Promise<void> {
    const deleteData = this.getOne(id);
    if (!deleteData) {
      throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
    } else {
      await this.sessionRepository.delete(id);
    }
  }

  // unique value validation
  async update(id: number, updateData: UpdateSessionDto): Promise<void> {
    const updateSession = await this.getOne(id);

    if (!updateSession) {
      throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
    } else {
      await this.sessionRepository.save(updateData);
    }
  }
}
