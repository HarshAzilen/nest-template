import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { PostEntity } from '../post/entities/post.entity';

// import { CreateUsersPosts1666871115593 } from './migrations/1666871115593-CreateUsersPosts';
// import { SeedInitialUser1667911463021 } from './migrations/1667911463021-SeedInitialUser';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [UserEntity, PostEntity],
        synchronize: false,
        //migrations: [CreateUsersPosts1666871115593, SeedInitialUser1667911463021],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          entitiesDir: 'src',
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
