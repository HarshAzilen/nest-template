import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { RoleModule } from '../role/role.module';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, VenueModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
