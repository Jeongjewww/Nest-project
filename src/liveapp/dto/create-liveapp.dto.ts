import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateLiveAppDto {
  @IsNumber()
  id: number;

  @IsString()
  liveAppId: string;

  @IsUrl()
  publicUrl: string;

  @IsUrl()
  privateUrl: string;
}
