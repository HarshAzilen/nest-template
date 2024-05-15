import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HashingService } from '../auth/hashing.service';
import { PostgresErrorCode } from '../../database/postgress-error-code.enum';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DuplicateUserException } from './exceptions/duplicate-user.exception';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UserService extends CommonService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private hashingService: HashingService,
  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hashString(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      uuid: uuid(),
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(newUser);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === PostgresErrorCode.UniqueViolation) {
          throw new DuplicateUserException();
        }
      }
    }
    return newUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(uuid: string) {
    return this.userRepository.findOneBy({ uuid });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ uuid }, updateUserDto);
  }

  async remove(uuid: string) {
    await this.userRepository.delete({ uuid });
  }
}
