import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@Injectable()
@QueryService(Service)
export class ServiceService extends TypeOrmQueryService<Service> {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {
    super(serviceRepository, { useSoftDelete: true });
  }

  async getAll(): Promise<Service[]> {
    const result = await this.serviceRepository.find();
    console.log(result);
    return result;
  }

  async create(serviceData: CreateServiceDto) {
    console.log(serviceData);
    try {
      await this.serviceRepository.save(serviceData);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('야 여기 에러났다 ! ');
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

  async delete(idList: string[]): Promise<void> {
    for (const id in idList) {
      try {
        await this.serviceRepository.softDelete(idList[id]);
      } catch (err) {
        throw new InternalServerErrorException('데이터를 삭제할 수 없습니다.', {
          cause: new Error(),
          description: '데이터가 존재하지 않습니다.',
        });
      }
    }
  }

  async update(updateData: UpdateServiceDto[]): Promise<void> {
    try {
      for (var i = 0; i < updateData.length; i++) {
        console.log(updateData[i].id, updateData[i]);
        await this.serviceRepository.softDelete(updateData[i].id);
        await this.serviceRepository.save(updateData[i]);
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('야 여기 에러났다 ! ');
        throw new InternalServerErrorException('데이터를 수정할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }
}
