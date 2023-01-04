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
import { ModesetJson } from './entities/modesetJson.entity';
import { ModesetService } from './modeset.service';

// modeId; date + index num
var id = 1;
function modeIndex() {
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let fullDate = year + '' + month + '' + date;

  while (true) {
    if (id < 10) {
      var string = '-0';
    } else {
      var string = '-';
    }
    return fullDate + string + `${id++}`;
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

  @Get('/json')
  async modesetJson(): Promise<ModesetJson[]> {
    return await this.modesetService.getJson();
  }

  @Post()
  async createModeset(@Body() modesetData: CreateModesetDto): Promise<void> {
    let lives = await this.liveappService.getLiveAll();
    let allocateModeId = modeIndex();
    modesetData.modeId = allocateModeId; // modeId 값 지정
    console.log(allocateModeId);
    // console.log(lives[0].liveAppId);

    return await this.modesetService.create(lives, modesetData, 1);
  }

  @Delete()
  async deleteModeset(@Query('id') idList: string[]): Promise<void> {
    let data: Object[] = [];
    if (!(idList instanceof Array)) {
      data.push(idList);
    } else {
      data = idList;
    }
    console.log(data);

    // { id: [ '20221215-3', '20221215-4' ] }
    // for (const id in idList) {
    //   console.log(idList[id]); // [ '20221215-3', '20221215-4' ]
    //   console.log(idList[id].length); // 2
    //   for (var i = 0; i < idList[id].length; i++) {
    //     console.log(idList[id][i]);
    //   }
    // }
    return await this.modesetService.delete(data);
  }

  @Patch()
  async updateModeset(@Body() updateData: UpdateModesetDto[]): Promise<void> {
    return await this.modesetService.update(updateData);
  }
}
