import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/modeset/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Injectable()
export class SessionService {
  private server: Session[] = [];

  getAll(): Session[] {
    return this.server;
  }

  getOne(id: number): Session {
    const session = this.server.find((session) => session.id === id);
    if (!session) {
      throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
    }
    return session;
  }

  create(sessionData: CreateSessionDto) {
    this.server.push({
      id: this.server.length + 1,
      ...sessionData,
    });
  }

  delete(id: number) {
    const deleteData = this.getOne(id);
    if (!deleteData) {
      throw new NotFoundException(`${id}번 세션서버 정보를 찾을 수 없습니다.`);
    } else {
      this.server = this.server.filter((session) => session.id !== id);
    }
  }

  update(id: number, updateData: UpdateSessionDto) {
    const oneSession = this.getOne(id);
    this.delete(id);
    this.server.push({ ...oneSession, ...updateData });
  }
}
