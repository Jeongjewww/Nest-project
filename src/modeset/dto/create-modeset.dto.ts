import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

export class CreateModesetDto {
  @IsString()
  @IsNotEmpty()
  modeName: string;

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
  sessionName: string;

  @IsString()
  @IsOptional()
  serviceName: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
