import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), forwardRef(() => AuthModule)],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService],
})
export class ClientModule {}
