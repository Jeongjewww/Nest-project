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

  @Post()
  async createService(@Body() serviceData: CreateServiceDto): Promise<void> {
    return this.serviceServer.create(serviceData);
  }

  @Delete()
  async deleteService(@Query() idList: string[]): Promise<void> {
    return await this.serviceServer.delete(idList);
  }

  @Patch('/:id')
  async updateSession(
    @Query() idList: any,
    @Body() updateData: UpdateServiceDto[],
  ): Promise<void> {
    console.log(idList.id[0]);
    console.log(updateData);
    return await this.serviceServer.update(idList, updateData);
  }
}
