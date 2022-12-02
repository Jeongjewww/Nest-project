import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Session API')
    .setDescription('API info of Seesion Server')
    .setVersion('v0.1')
    .addTag('session')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*', // insert url
    methods: 'GET,POST,DELETE,PATCH',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(3001);
}
bootstrap();
