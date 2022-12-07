import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateModesetDto } from './create-modeset.dto';

export class OneModesetDto {
  @IsNumber()
  id: number;
}

export class UpdateModesetDto extends IntersectionType(
  CreateModesetDto,
  OneModesetDto,
) {}
