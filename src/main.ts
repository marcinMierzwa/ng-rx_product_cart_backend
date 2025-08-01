import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './core/filters/prisma-exception/prisma-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);

  const clientUrls = [
    configService.get<string>('PROD_CLIENT_URL'),
    configService.get<string>('DEV_CLIENT_URL'),

  ].filter(Boolean); 

  app.enableCors({
    origin: clientUrls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(3000);
}
bootstrap();
