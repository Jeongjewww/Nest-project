import {
  IsBoolean,
  IsDate,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionName: string;

  @IsIP()
  @IsOptional()
  privateIp: string;

  @IsNumber()
  @IsOptional()
  privatePort: number;

  @IsIP()
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

  // @IsNumber()
  // refCnt: number;
}
