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

  @Get('/each')
  async getOneService(
    @Query('id', ParseIntPipe) serviceId: number,
  ): Promise<Service> {
    return await this.serviceServer.getOne(serviceId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createService(
    @Body(ValidationPipe) serviceData: CreateServiceDto,
  ): Promise<void> {
    return this.serviceServer.create(serviceData);
  }

  @Delete()
  async deleteService(@Query() queryData: string[]): Promise<void> {
    return this.serviceServer.delete(queryData);
  }

  @Patch('/:id')
  async updateService(
    @Param('id', ParseIntPipe) updateId: number,
    @Body() updateData: UpdateServiceDto,
  ): Promise<void> {
    return this.serviceServer.update(updateId, updateData);
  }
}
