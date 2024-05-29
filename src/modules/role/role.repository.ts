import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { NullableType } from '../../utils/types/nullable.type';
import { CommonRepository } from '../../common/common.repository';
import { CreateRoleDto } from './dto/request-role.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';

@Injectable()
export class RoleRepository extends CommonRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }

  async create(data: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.save(data);
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async update(id: string, payload: Partial<RoleEntity>): Promise<RoleEntity> {
    const entity = await this.roleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Role not found');
    }

    return await this.roleRepository.save({ ...entity, ...payload });
  }

  async findOneByRole(role: string): Promise<NullableType<RoleEntity>> {
    return await this.roleRepository.findOne({ where: { role } });
  }

  async findOne(fields: EntityCondition<RoleEntity>): Promise<NullableType<RoleEntity>> {
    return await this.roleRepository.findOne({
      where: fields as FindOptionsWhere<RoleEntity>,
    });
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.roleRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found for deletion`);
    }
  }
}
