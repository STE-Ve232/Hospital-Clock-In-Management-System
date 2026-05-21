import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SwaggerConfig } from './shared/swagger/swagger.config';
import { HttpErrorFormatterInterceptor } from './shared/http/http-error-formatter.interceptor';
import cookieParser = require('cookie-parser');
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let serverPromise;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.use(helmet());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.useGlobalInterceptors(new HttpErrorFormatterInterceptor());

  SwaggerConfig.apply(app);

  await app.init();
  return expressApp;
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    if (!serverPromise) {
      serverPromise = bootstrap();
    }
    const server = await serverPromise;
    return server(request as any, env, ctx);
  },
};
