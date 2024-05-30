import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/request-role.dto';
import { CommonService } from '../../common/common.service';
import { RoleRepository } from './role.repository';
import { NullableType } from '../../utils/types/nullable.type';

@Injectable()
export class RoleService extends CommonService<RoleEntity> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleRepository.create({
        ...createRoleDto,
      });
    } catch (error: unknown) {
      throw new Error();
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.findAll();
    } catch (error: any) {
      throw new Error();
    }
  }
  async findOneByRole(role: string): Promise<NullableType<RoleEntity>> {
    return await this.roleRepository.findOneByRole(role);
  }
  public async findOneById(id: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ id });
  }

  async remove(id: string) {
    await this.roleRepository.delete(id);
  }
}
