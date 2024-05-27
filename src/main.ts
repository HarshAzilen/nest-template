import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import helmet from 'helmet';
import * as yaml from 'js-yaml';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, bodyParser: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(helmet());
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Convert JSON to YAML
  const yamlSpec = yaml.dump(document, { indent: 2 });

  // Save YAML to file
  fs.writeFileSync('./swagger.yaml', yamlSpec);
  SwaggerModule.setup('docs', app, document);

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
