import { IsString } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

export class CreateModesetDto {
  @IsString()
  desc: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
