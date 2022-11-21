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
} from '@nestjs/common';
import { Session } from 'src/modeset/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { SessionService } from '../services/session.service';

@Controller('session')
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

  // 전체 데이터 추가
  // @Post()
  // @UsePipes(ValidationPipe)
  // createSession(@Body(ValidationPipe) sessionData: CreateSessionDto) {
  //   return this.sessionServer.create(sessionData);
  // }

  // @Delete('/:id')
  // deleteSession(@Param('id') sessionId: number): void {
  //   return this.sessionServer.delete(sessionId);
  // }

  // @Patch('/:id')
  // updateSession(
  //   @Param('id') sessionId: number,
  //   @Body() updateData: UpdateSessionDto,
  // ) {
  //   return this.sessionServer.update(sessionId, updateData);
  // }
}
