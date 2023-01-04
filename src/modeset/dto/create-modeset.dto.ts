import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

export class CreateModesetDto {
  @IsString()
  @IsOptional()
  modeId: string;

  @IsString()
  @IsNotEmpty()
  modeName: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
