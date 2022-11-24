import {
  IsBoolean,
  IsDate,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  serverName: string;

  @IsString()
  @IsNotEmpty()
  network: string;

  @IsIP()
  @IsOptional()
  ip: string;

  @IsNumber()
  @IsOptional()
  port: number;

  @IsNumber()
  @IsOptional()
  inspectorPort: number;

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

  // @IsNumber()
  // refCnt: number;
}
