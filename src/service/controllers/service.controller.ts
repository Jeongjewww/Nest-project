import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
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

  // @Get('/each')
  // async getOneService(
  //   @Query('id', ParseIntPipe) serviceId: number,
  // ): Promise<Service> {
  //   return await this.serviceServer.getOne(serviceId);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createService(
    @Body(ValidationPipe) serviceData: CreateServiceDto,
  ): Promise<void> {
    return this.serviceServer.create(serviceData);
  }

  @Delete()
  async deleteService(@Query() idList: string[]): Promise<void> {
    return this.serviceServer.delete(idList);
  }

  // 수정 중
  @Patch('/:id')
  async updateService(
    @Param('id', ParseIntPipe) updateId: number,
    @Body() updateData: UpdateServiceDto,
  ): Promise<void> {
    return this.serviceServer.update(updateId, updateData);
  }
}
