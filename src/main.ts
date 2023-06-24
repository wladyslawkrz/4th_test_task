import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { PrismaExceptionFilter } from './common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('App-Main');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT') || 8080;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addTag('Authorization')
    .setTitle('Meetup REST API')
    .setDescription('Modsen 4th task related with NestJS back-end framework')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(cookieParser());

  app.enableShutdownHooks();

  process.on('SIGTERM', () => {
    logger.log(`Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
  });

  process.on('SIGINT', () => {
    logger.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
  });

  process.on('SIGQUIT', () => {
    logger.log(`Process ${process.pid}, has been quited`);
    process.exit(0);
  });

  await app.listen(PORT, () => {
    logger.log(`Application listening on port ${PORT}`);
  });
}
bootstrap();
