import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class OneSessionDto {
  @IsNumber()
  id: number;
}

export class UpdateSessionDto extends IntersectionType(
  CreateSessionDto,
  OneSessionDto,
) {}
