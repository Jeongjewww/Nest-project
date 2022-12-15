import { IntersectionType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateModesetDto } from './create-modeset.dto';

export class OneModesetDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  modeAppId: string;

  @IsBoolean()
  @IsOptional()
  debug: boolean;

  @IsString()
  @IsOptional()
  publicSession: string;

  @IsString()
  @IsOptional()
  privateSession: string;

  @IsString()
  @IsOptional()
  publicService: string;

  @IsString()
  @IsOptional()
  privateService: string;
}

export class UpdateModesetDto extends IntersectionType(
  CreateModesetDto,
  OneModesetDto,
) {}
