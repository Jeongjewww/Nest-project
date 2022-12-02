import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
<<<<<<< Updated upstream
=======
  Query,
  UseInterceptors,
>>>>>>> Stashed changes
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceInterceptor } from 'src/interceptors/service.interceptor';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';
import { ServiceService } from '../services/service.service';

@Controller('service')
@UseInterceptors(ServiceInterceptor)
export class ServiceController {
  constructor(private readonly serviceServer: ServiceService) {}

  @Get('/')
  async getAllService(): Promise<Service[]> {
    return await this.serviceServer.getAll();
  }

<<<<<<< Updated upstream
  @Get('/:id')
  async getOneService(
    @Param('id', ParseIntPipe) serviceId: number,
  ): Promise<Service> {
    return await this.serviceServer.getOne(serviceId);
  }
=======
  // @Get('/each')
  // async getOneService(
  //   @Query('id', ParseIntPipe) serviceId: number,
  // ): Promise<Service> {
  //   return await this.serviceServer.getOne(serviceId);
  // }
>>>>>>> Stashed changes

  @Post()
  @UsePipes(ValidationPipe)
  createService(
    @Body(ValidationPipe) serviceData: CreateServiceDto,
  ): Promise<void> {
    return this.serviceServer.create(serviceData);
  }

  @Delete()
<<<<<<< Updated upstream
  deleteService(@Param('id', ParseIntPipe) serviceId: number): Promise<void> {
    return this.serviceServer.delete(serviceId);
=======
  async deleteService(@Query() idList: string[]): Promise<void> {
    return this.serviceServer.delete(idList);
>>>>>>> Stashed changes
  }

  // 수정 중
  @Patch('/:id')
  updateService(
    @Param('id', ParseIntPipe) updateId: number,
    @Body() updateData: UpdateServiceDto,
  ): Promise<void> {
    return this.serviceServer.update(updateId, updateData);
  }
}
