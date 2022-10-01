import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const config: ConfigService = app.get(ConfigService);
  // const port: number = config.get<number>('PORT');
  app.setGlobalPrefix('/api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dev Book')
    .setDescription('Dev Book API description')
    .setVersion('1.0')
    .addTag('devbook')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
