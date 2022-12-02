import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async getOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });

    if (!service) {
      throw new NotFoundException(
        `${id}번 서비스서버 정보를 찾을 수 없습니다.`,
      );
    }
    return service;
  }

  async create(serviceData: CreateServiceDto) {
    const newService = this.serviceRepository.create(serviceData);

    await this.serviceRepository.save(newService);
  }

  async delete(queryData: string[]): Promise<void> {
    for (const data in queryData) {
      if (!queryData[data]) {
        throw new NotFoundException(
          `${queryData[data]}번 서비스서버 정보를 찾을 수 없습니다.`,
        );
      } else {
        await this.serviceRepository.delete(queryData[data]);
      }
    }
  }

  async update(id: number, updateData: UpdateServiceDto): Promise<void> {
    const updateService = await this.getOne(id);

    if (!updateService) {
      throw new NotFoundException(
        `${id}번 서비스서버 정보를 찾을 수 없습니다.`,
      );
    } else {
      await this.serviceRepository.save(updateData);
    }
  }
}
