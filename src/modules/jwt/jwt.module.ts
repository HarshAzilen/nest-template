import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [ConfigModule, RoleModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
