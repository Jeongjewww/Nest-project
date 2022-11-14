import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionServer: string;

  @IsString()
  @IsOptional()
  privateIp: string;

  @IsNumber()
  @IsOptional()
  privatePort: number;

  @IsString()
  @IsOptional()
  publicIp: string;

  @IsNumber()
  @IsOptional()
  publicPort: number;

  @IsString()
  @IsOptional()
  createSub: string;

  @IsDate()
  @IsOptional()
  createDate: Date;

  @IsString()
  @IsOptional()
  updateSub: string;

  @IsDate()
  @IsOptional()
  updateDate: Date;

  @IsBoolean()
  @IsOptional()
  delete: boolean;

  @IsNumber()
  refCnt: number;
}
