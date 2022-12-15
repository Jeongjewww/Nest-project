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
import { ModesetInterceptor } from 'src/interceptors/modeset.interceptor';
import { LiveappService } from 'src/liveapp/liveapp.service';
import { CreateModesetDto } from './dto/create-modeset.dto';
import { UpdateModesetDto } from './dto/update-modeset.dto';
import { ModeAppId } from './entities/modeAppId.entity';
import { ModesetService } from './modeset.service';

// modeId; date + index num
var id = 1;
function modeid() {
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let fullDate = year + '' + month + '' + date;

  // 날짜가 바뀌는 것에 대한 조건
  while (true) {
    let modeid = fullDate + '-0' + `${id++}`;
    return modeid;
  }
}

@Controller('modeset')
@UseInterceptors(ModesetInterceptor)
export class ModesetController {
  constructor(
    private readonly modesetService: ModesetService,
    private readonly liveappService: LiveappService,
  ) {}

  @Get('/')
  async getAllModeset(): Promise<ModeAppId[]> {
    return await this.modesetService.getAll();
  }

  @Post()
  async createModeset(@Body() modesetData: CreateModesetDto): Promise<void> {
    let lives = await this.liveappService.getLiveAll();
    let allocateModeId = modeid();
    console.log(allocateModeId);
    // console.log('이게 contorller 에서 부른 live');
    // console.log(lives);
    // console.log(lives[0].liveAppId);

    return await this.modesetService.create(allocateModeId, lives, modesetData);
  }

  @Delete()
  async deleteModeset(@Query() id: number): Promise<void> {
    return await this.modesetService.delete(id);
  }

  @Patch()
  async updateModeset(
    @Body() updateModeset: UpdateModesetDto[],
  ): Promise<void> {
    return await this.modesetService.update(updateModeset);
  }
}
