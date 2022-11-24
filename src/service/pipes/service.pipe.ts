import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ServicePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metadata: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Object, Array];
    return !types.includes(metadata);
  }
}
