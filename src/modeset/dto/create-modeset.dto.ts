import { IsString } from 'class-validator';

export class CreateModesetDto {
  @IsString()
  desc: string;
}
