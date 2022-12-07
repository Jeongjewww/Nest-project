import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateLiveAppDto {
  @IsString()
  liveAppId: string;

  @IsUrl()
  publicUrl: string;

  @IsUrl()
  privateUrl: string;
}
