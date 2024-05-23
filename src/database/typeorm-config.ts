import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeORMCLIModule } from './typeorm-cli.module';

@Injectable()
export class AppDataSource {
  async getDataSourceOptions(): Promise<DataSourceOptions> {
    const appCtx = await NestFactory.createApplicationContext(TypeORMCLIModule);
    const configService = await appCtx.get(ConfigService);

    return {
      type: 'mssql',
      host: configService.get<string>('DATABASE_HOST'),
      port: +configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', false),
      schema: configService.get<string>('SCHEMA'),
      dropSchema: false,
      logging: process.env.NODE_ENV !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../**/*-migrations.{ts,js}'],
      extra: {
        trustServerCertificate: true,
        max: configService.get<number>('DATABASE_MAX_CONNECTIONS', 100),
        ssl: configService.get<boolean>('DATABASE_SSL_ENABLED', false)
          ? {
              rejectUnauthorized: configService.get<boolean>('DATABASE_REJECT_UNAUTHORIZED', false),
              ca: configService.get<string>('DATABASE_CA', undefined),
              key: configService.get<string>('DATABASE_KEY', undefined),
              cert: configService.get<string>('DATABASE_CERT', undefined),
            }
          : undefined,
      },
    };
  }
  async getDataSourceInstance(): Promise<DataSource> {
    const dataSource = await this.getDataSourceOptions();
    return new DataSource(dataSource);
  }
}

export const dataSourceInstance = new AppDataSource().getDataSourceInstance();
