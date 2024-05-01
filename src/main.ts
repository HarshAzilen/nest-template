import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './utils/response-format.interceptor';
import { ExceptionFormatFilter } from './utils/exception-format.filter';
import { DomainExceptionInterceptor } from './utils/domain-exception.filter';
import { Logger, LoggerErrorInterceptor, LoggerModule, PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(helmet());
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalFilters(new ExceptionFormatFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseFormatInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new DomainExceptionInterceptor());

  // Different types of versioning available - https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const expressInstance = app.getHttpAdapter().getInstance();
  await app.listen(configService.get<number>('PORT') || 3000, () => {
    PinoLogger.prototype.info('Server is running on Port:' + configService.get<number>('PORT'));
    PinoLogger.prototype.info('http://localhost:' + configService.get<number>('PORT'));
  });
}

void bootstrap();
