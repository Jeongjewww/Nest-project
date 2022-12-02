import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionQueryDto } from 'src/session/dto/create-session.dto';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';
import {
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
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
    return await this.serviceRepository.find();
  }

  async create(serviceData: CreateServiceDto) {
    try {
      await this.serviceRepository.save(serviceData);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException('데이터를 추가할 수 없습니다.', {
          cause: new Error(),
          description: '중복데이터가 존재합니다.',
        });
      }
    }
  }

<<<<<<< Updated upstream
  async delete(id: number): Promise<void> {
    const deleteData = this.getOne(id);
    if (!deleteData) {
      throw new NotFoundException(
        `${id}번 서비스서버 정보를 찾을 수 없습니다.`,
      );
    } else {
      await this.serviceRepository.delete(id);
=======
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
>>>>>>> Stashed changes
    }
  }

  async update(id: number, updateData: UpdateServiceDto): Promise<void> {
    // 수정 중
  }
}
