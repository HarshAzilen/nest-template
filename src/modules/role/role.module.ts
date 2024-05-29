import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
