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
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Session } from 'src/session/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { SessionService } from '../services/session.service';

@Controller('session')
@UseInterceptors(TransformInterceptor)
export class SessionController {
  constructor(private readonly sessionServer: SessionService) {}

  @Get('/')
  async getAllSession(): Promise<Session[]> {
    return await this.sessionServer.getAll();
  }

  @Get('/:id')
  async getOneSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<Session> {
    return await this.sessionServer.getOne(sessionId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSession(
    @Body(ValidationPipe) sessionData: CreateSessionDto,
  ): Promise<void> {
    return this.sessionServer.create(sessionData);
  }

  @Delete('/:id')
  deleteSession(@Param('id', ParseIntPipe) sessionId: number): Promise<void> {
    return this.sessionServer.delete(sessionId);
  }

  @Patch('/:id')
  updateSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() updateData: UpdateSessionDto,
  ): Promise<void> {
    return this.sessionServer.update(+sessionId, updateData);
  }
}
