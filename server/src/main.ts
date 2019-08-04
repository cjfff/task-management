import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@app/common/pipes/validation.pipe';
import { HttpExceptionFilter } from '@app/common/filters/error.filter';
import { Logger } from '@nestjs/common';
import { environment, isProdMode, isDevMode } from '@app/app.environment';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';


const port = process.env.PORT || 8888;

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => isDevMode ? c : '';
Object.assign(global.console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[task-management]', ...args),
  info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[task-management]', ...args),
  error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[task-management]', ...args),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(
    new LoggingInterceptor()
  )
  return await app.listen(port);
}

bootstrap().then((_) => {
  console.info(`TaskManagement Run! port at ${port}, env: ${environment}`)
});
