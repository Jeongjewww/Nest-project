import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateModesetDto } from './dto/create-modeset.dto';
import { UpdateModesetDto } from './dto/update-modeset.dto';
import { ModesetList } from './entities/modesetList.entity';
import { ModesetService } from './modeset.service';

@Controller('modeset')
export class ModesetController {
  constructor(private readonly modesetService: ModesetService) {}
  @Get('/')
  async getAllModeset(): Promise<ModesetList[]> {
    return await this.modesetService.getAll();
  }

  @Post()
  async createModeset(@Body() modesetData: CreateModesetDto): Promise<void> {
    return await this.modesetService.create(modesetData);
  }

  @Delete()
  async deleteModeset(@Query() idList: string[]): Promise<void> {
    return await this.modesetService.delete(idList);
  }

  @Patch()
  async updateModeset(
    @Body() updateModeset: UpdateModesetDto[],
  ): Promise<void> {
    return await this.modesetService.update(updateModeset);
  }
}
