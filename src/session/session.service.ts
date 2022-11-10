import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Session } from 'src/entities/session.entity';
import { CreateSessionDto } from './dto/create.session.dto';
import { UpdateSessionDto } from './dto/update.session.dto';

@Injectable()
export class SessionService {
    private server: Session[] = [];

    getAll(): Session[] {
        return this.server;
    }

    getOne(id: number): Session {
        const session = this.server.find(session => session.id === id);
        if (!session) {
            throw new InternalServerErrorException("서버 오류로 값을 가져올 수 없습니다.");
        }
        return session;
    }

    create(sessionData: CreateSessionDto) {
        this.server.push({
            id: this.server.length + 1,
            ...sessionData,
        })
    }

    delete(id: number) {
        this.getOne(id);
        this.server = this.server.filter(session => session.id !== id);
    }

    update(id: number, updateData: UpdateSessionDto) {
        const oneSession = this.getOne(id);
        this.server.push({ ...oneSession, ...updateData });
    }
}
