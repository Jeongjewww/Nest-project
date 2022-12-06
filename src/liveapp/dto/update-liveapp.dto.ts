import { PartialType } from '@nestjs/mapped-types';
import { CreateLiveAppDto } from './create-liveapp.dto';

export class UpdateLiveAppDto extends PartialType(CreateLiveAppDto) {}
