import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { NullableType } from '../../utils/types/nullable.type';
import { CommonRepository } from '../../common/common.repository';
import { CreateUserDto } from './dto/request-user.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';

@Injectable()
export class UserRepository extends CommonRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async searchByEmail(email: string, venueOperatorId: string): Promise<UserEntity[]> {
    console.log('🚀 ~ UserRepository ~ searchByEmail ~ email:', email);
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email LIKE :email', { email: `%${email}%` })
      .andWhere('user.addedBy = :venueOperatorId', { venueOperatorId })
      .getMany();
  }

  async findUserWithRole(id: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .select(['user.id AS "id"', 'role.role AS "role"'])
      .where('user.id = :id', { id: id })
      .getRawOne();
  }

  async update(id: string, payload: Partial<UserEntity>): Promise<UserEntity> {
    // Find the entity by ID
    const entity = await this.userRepository.findOne({ where: { id } });

    if (!entity) {
      throw new Error('User not found');
    }

    // Update the entity with the payload
    Object.assign(entity, payload);

    // Save the updated entity
    return await this.userRepository.save(entity);
  }

  async findOneByEmail(email: string): Promise<NullableType<UserEntity>> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async findOne(fields: EntityCondition<UserEntity>): Promise<NullableType<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: fields as FindOptionsWhere<UserEntity>,
    });
    return user;
  }
  async delete(id: string): Promise<void> {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found for deletion`);
    }
  }
}
