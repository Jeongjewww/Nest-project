import {
  IsDate,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  network: string;

  @IsIP()
  @IsOptional()
  ip: string;

  @IsString()
  @IsOptional()
  port: string;

  @IsString()
  @IsOptional()
  inspectorPort: string;

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
}
