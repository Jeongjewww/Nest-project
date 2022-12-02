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
  Query,
} from '@nestjs/common';
<<<<<<< Updated upstream
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
=======
import { SessionInterceptor } from 'src/interceptors/session.interceptor';
>>>>>>> Stashed changes
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

  @Get('/:id')
  async getOneSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<Session> {
    return await this.sessionServer.getOne(sessionId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createSession(
    @Body(ValidationPipe) sessionData: CreateSessionDto,
  ): Promise<void> {
    return await this.sessionServer.create(sessionData);
  }

<<<<<<< Updated upstream
  @Delete('/')
  async deleteSession(@Query() queryData: string[]): Promise<void> {
    return await this.sessionServer.delete(queryData);
=======
  @Delete()
  async deleteSession(@Query() idList: string[]): Promise<void> {
    return await this.sessionServer.delete(idList);
>>>>>>> Stashed changes
  }

  // @Patch('/')
  // async updateSession(
  //   @Query() queryData: any,
  //   @Body() updateData: UpdateSessionDto,
  // ): Promise<void> {
  //   // return await this.sessionServer.update(queryData, updateData);
  //   console.log(queryData.id);
  }
}
