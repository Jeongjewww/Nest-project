import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

export class CreateModesetDto {
  @IsString()
  // @IsNotEmpty()
  modeId: string;

  @IsString()
  @IsNotEmpty()
  modeName: string;
}
