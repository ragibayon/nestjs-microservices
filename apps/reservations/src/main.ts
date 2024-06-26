import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('HTTP_PORT');
  await app.listen(port, () => {
    logger.log(`app listening on port: ${port}`);
  });
}
bootstrap();
