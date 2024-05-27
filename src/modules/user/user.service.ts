import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/response-user.dto';
import { CommonService } from '../../common/common.service';
import { isNull, isUndefined } from '../../utils/validation.util';
import { compare, hash } from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends CommonService<UserEntity> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);
      return await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error: unknown) {
      throw new Error();
    }
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email: email.toLowerCase(),
    });
    this.throwUnauthorizedException(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error: any) {
      throw new Error();
    }
  }

  public async confirmEmail(userId: string): Promise<UserEntity> {
    const user = await this.findOneByCredentials(userId);

    // if (user.confirmed) {
    //   throw new BadRequestException('Email already confirmed');
    // }

    // user.confirmed = true;
    // await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  private throwUnauthorizedException(user: undefined | null | UserEntity): void {
    if (isUndefined(user) || isNull(user)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public async resetPassword(userId: string, password: string): Promise<UserEntity> {
    const user = await this.findOne(userId);
    // user.credentials.updatePassword(user.password);
    user.password = await hash(password, 10);
    // await this.commonService.saveEntity(this.userRepository, user);
    return user;
  }

  public async uncheckedUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      email: email.toLowerCase(),
    });
  }

  // public async confirmEmail(userId: string, version: number): Promise<UserEntity> {
  //   const user = await this.findOneByCredentials(userId, version);

  //   // if (user.confirmed) {
  //   //   throw new BadRequestException('Email already confirmed');
  //   // }

  //   // user.confirmed = true;
  //   // user.credentials.updateVersion();
  //   await this.userRepository.create(user)
  //   await this.commonService.saveEntity(this.userRepository, user);
  //   return user;
  // }

  public async findOneByCredentials(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });

    return user;
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  public async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  public async updatePassword(userId: string, password: string, newPassword: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    if (await compare(newPassword, user.password)) {
      throw new BadRequestException('New password must be different');
    }
    user.password = await hash(newPassword, 10);
    await this.update(user.id, user);
    return user;
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}