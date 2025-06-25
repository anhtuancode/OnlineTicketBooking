import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { ResponseSuccessInterceptor } from './common/interceptor/response-success.interceptor';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  //GLOBAL
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); // Chỉ nhận các trường có trong DTO

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Online Ticket Booking API')
    .setDescription('The Online Ticket API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(PORT ?? 3069);
}
bootstrap();
