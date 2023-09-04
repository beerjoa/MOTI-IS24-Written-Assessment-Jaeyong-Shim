import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './utils/typeorm-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV !== 'production'
        ? ['error', 'warn', 'log', 'debug', 'verbose']
        : ['error', 'warn', 'log'],
    cors: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new TypeORMExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MOTI PRS API')
    .setDescription('moti-prs-backend API')
    .setVersion('0.5.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
