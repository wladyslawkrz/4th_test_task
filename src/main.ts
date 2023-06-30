import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import {
  AllExceptionsFilter,
  PrismaExceptionFilter,
  initializeSwaggerDocument,
} from './common';

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

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(cookieParser());

  app.enableShutdownHooks();

  initializeSwaggerDocument(app);

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
