import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Session } from 'src/session/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { SessionService } from '../service/session.service';

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

  // 전체 데이터 추가
  @Post()
  @UsePipes(ValidationPipe)
  createSession(@Body(ValidationPipe) sessionData: CreateSessionDto) {
    return this.sessionServer.create(sessionData);
  }

  @Delete('/:id')
  deleteSession(@Param('id') sessionId: number) {
    return this.sessionServer.delete(sessionId);
  }

  @Patch('/:id')
  updateSession(
    @Param('id') sessionId: number,
    @Body() updateData: UpdateSessionDto,
  ) {
    return this.sessionServer.update(sessionId, updateData);
  }
}