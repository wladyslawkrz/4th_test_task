import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initializeSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addTag('Authorization')
    .setTitle('Meetup REST API')
    .setDescription('Modsen 4th task related with NestJS back-end framework')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
