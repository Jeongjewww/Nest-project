import {
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

  @IsString()
  @IsOptional()
  privatePort: string;

  @IsIP()
  @IsOptional()
  publicIp: string;

  @IsString()
  @IsOptional()
  publicPort: string;

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
