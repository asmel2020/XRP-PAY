import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('port'));
}
bootstrap();
