import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateLiveAppDto } from './create-liveapp.dto';

export class OneLiveAppDto {
  @IsNumber()
  id: number;
}

export class UpdateLiveAppDto extends IntersectionType(
  CreateLiveAppDto,
  OneLiveAppDto,
) {}
