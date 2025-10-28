import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpResponseExceptionFilter } from 'src/common/filters/http.response.filter';
import { ResponseTransformInterceptor } from 'src/common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  app.useGlobalFilters(new HttpResponseExceptionFilter());

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
