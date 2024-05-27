import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        schema: configService.get<string>('SCHEMA'),
        synchronize: false,
        migrations: [__dirname + '/../**/*-migrations.{ts,js}'],
        cli: {
          entitiesDir: 'src',
          migrationsDir: 'src/database/migrations',
        },
        extra: {
          trustServerCertificate: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
