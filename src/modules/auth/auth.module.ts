import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtService } from '../jwt/jwt.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule, ConfigModule, ThrottlerModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [],
})
export class AuthModule {}
