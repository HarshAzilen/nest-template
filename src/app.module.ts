import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule } from '@nestjs/throttler';
const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (_req, _res) => ({
          context: 'HTTP',
        }),
        level: 'trace',
        transport: {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname',
            singleLine: true,
            customLevels: levels,
            useOnlyCustomLevels: true,
            colorize: true,
            levelFirst: true,
            translateTime: 'yyyy-dd-mm, h:MM:ss TT',
          },
        },
      },
    }),
    ConfigModule.forRoot({ ignoreEnvFile: false, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
