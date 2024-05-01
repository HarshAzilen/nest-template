import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: false, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
})
export class AppModule {}
