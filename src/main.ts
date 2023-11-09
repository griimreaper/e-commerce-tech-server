/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
const port = process.env.SERVER_PORT ?? 3001
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();
  app.use(morgan('dev'));

  await app.listen(port);
  console.log(`Application running on: ${port}`);
}
bootstrap();
