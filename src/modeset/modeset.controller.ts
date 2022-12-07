import { Controller, Get } from '@nestjs/common';
import { ModesetList } from './entities/modesetList.entity';
import { ModesetService } from './modeset.service';

@Controller('modeset')
export class ModesetController {
  constructor(private readonly modesetService: ModesetService) {}
  @Get('/')
  async getAllModeset(): Promise<ModesetList[]> {
    return await this.modesetService.getAll();
  }
}
