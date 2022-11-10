import { Body, Controller, Get, Patch, Post, Param, Delete } from '@nestjs/common';
import { Session } from 'src/entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {

    constructor(private readonly sessionServer: SessionService) {}

    @Get('/')
    getAllSession(): Session[] {
        return this.sessionServer.getAll();
    }

    @Get('/:id')
    getOneSession(@Param('id') sessionId: number): Session {
        return this.sessionServer.getOne(sessionId);
    }

    @Post()
    createSession(@Body() sessionData: CreateSessionDto) {
        return this.sessionServer.create(sessionData);
    }

    @Delete('/:id')
    deleteSession(@Param('id') sessionId: number){
        return this.sessionServer.delete(sessionId);
    }

    @Patch('/:id')
    updateSession(@Param('id') sessionId: number, @Body() updateData: UpdateSessionDto) {
        return this.sessionServer.update(sessionId, updateData);
    }
}
