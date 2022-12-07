import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class OneServiceDto {
  @IsNumber()
  id: number;
}

export class UpdateServiceDto extends IntersectionType(
  CreateServiceDto,
  OneServiceDto,
) {}
