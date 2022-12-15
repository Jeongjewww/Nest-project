import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { LiveAppInterceptor } from 'src/interceptors/liveapp.interceptor';
import { CreateLiveAppDto } from './dto/create-liveapp.dto';
import { UpdateLiveAppDto } from './dto/update-liveapp.dto';
import { LiveAppId } from './entities/LiveAppId.entity';
import { LiveappService } from './liveapp.service';

@Controller('liveapp')
@UseInterceptors(LiveAppInterceptor)
export class LiveappController {
  constructor(private readonly liveappService: LiveappService) {}

  @Get('/')
  async getAllLive(): Promise<LiveAppId[]> {
    return await this.liveappService.getAll();
  }

  @Post()
  async createLive(@Body() liveData: CreateLiveAppDto): Promise<void> {
    return await this.liveappService.create(liveData);
  }

  @Delete()
  async deleteLive(@Query() idList: string[]): Promise<void> {
    return await this.liveappService.delete(idList);
  }

  @Patch()
  async updateLive(@Body() updateData: UpdateLiveAppDto[]): Promise<void> {
    return await this.liveappService.update(updateData);
  }
}
