import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { Config } from './Config';
import { HttpExceptionFilterModule } from './core/sessions/libs/HttpExceptionFilterModule';
import { LoggingInterceptorModule } from './core/sessions/libs/LoggingInterceptorsModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptorModule());
  app.useGlobalFilters(new HttpExceptionFilterModule());

  const config = new DocumentBuilder()
    .setTitle('GraphWay API')
    .setDescription('API для работы с режимами сессий')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(Config.PORT);
}
bootstrap();
