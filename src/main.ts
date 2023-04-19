import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_SERVER_PORT, APP_SERVER_HOSTNAME } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(APP_SERVER_PORT, APP_SERVER_HOSTNAME);
}
bootstrap();
