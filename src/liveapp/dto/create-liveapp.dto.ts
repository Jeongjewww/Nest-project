import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLiveAppDto {
  @IsString()
  liveAppId: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsUrl()
  @IsOptional()
  publicUrl: string;

  @IsUrl()
  @IsOptional()
  privateUrl: string;
}
