import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { SessionInterceptor } from 'src/interceptors/session.interceptor';
import { Session } from 'src/session/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { SessionService } from '../services/session.service';

@Controller('session')
@UseInterceptors(SessionInterceptor)
export class SessionController {
  constructor(private readonly sessionServer: SessionService) {}

  @Get('/')
  async getAllSession(): Promise<Session[]> {
    return await this.sessionServer.getAll();
  }

  @Post()
  async createSession(@Body() sessionData: CreateSessionDto): Promise<void> {
    return await this.sessionServer.create(sessionData);
  }

  @Delete()
  async deleteSession(@Query() idList: string[]): Promise<void> {
    return await this.sessionServer.delete(idList);
  }

  @Patch()
  async updateSession(@Body() updateData: UpdateSessionDto[]): Promise<void> {
    // console.log(updateData);
    return await this.sessionServer.update(updateData);
  }
}
