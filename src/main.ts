import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix roots
  app.setGlobalPrefix('/api');


  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('TODO')
    .setDescription('todo api in order to create task per user')
    .setVersion('0.1')
    .build();
  
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);

  // configure envirionment variables
  const configServices:ConfigService = app.get(ConfigService);

  app.enableCors();
  await app.listen(configServices.get<number>('port') || 3001);
}
bootstrap();
