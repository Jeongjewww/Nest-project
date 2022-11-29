import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';
import { ServiceService } from '../services/service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceServer: ServiceService) {}

  @Get('/')
  async getAllService(): Promise<Service[]> {
    return await this.serviceServer.getAll();
  }

  @Get('/:id')
  async getOneService(
    @Param('id', ParseIntPipe) serviceId: number,
  ): Promise<Service> {
    return await this.serviceServer.getOne(serviceId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createService(
    @Body(ValidationPipe) serviceData: CreateServiceDto,
  ): Promise<void> {
    return this.serviceServer.create(serviceData);
  }

  @Delete()
  deleteService(@Param('id', ParseIntPipe) serviceId: number): Promise<void> {
    return this.serviceServer.delete(serviceId);
  }

  @Patch('/:id')
  updateService(
    @Param('id', ParseIntPipe) updateId: number,
    @Body() updateData: UpdateServiceDto,
  ): Promise<void> {
    return this.serviceServer.update(updateId, updateData);
  }
}
