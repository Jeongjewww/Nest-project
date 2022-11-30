import { IsString, IsUrl } from 'class-validator';

export class CreateLiveAppDto {
  @IsString()
  liveAppId: string;

  @IsUrl()
  pubicUrl: string;

  @IsUrl()
  privateUrl: string;
}
