import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { join } from 'path';
import { CommonService } from '../../common/common.service';
import { sendEmail } from '../../helpers/sendEmail';
import { isNull, isUndefined } from '../../utils/validation.util';
import { UserMessages } from './constants/user.messages';
import { CreateUserDto, LocationOperatorDto, OtpRequestDto, ResetPasswordDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { VenueService } from '../venue/venue.service';
import { VenueMessages } from '../venue/constants/venue.messages';
import { RoleRepository } from '../role/role.repository';
import { ROLE } from '../role/constants/role.enum';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService extends CommonService<UserEntity> {
  constructor(
    private userRepository: UserRepository,
    private roleService: RoleService,
    private venueService: VenueService,
  ) {
    super(userRepository);
  }
  generatedOtps = new Set<string>();

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const userExist = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      if (userExist) {
        throw new BadRequestException(UserMessages.FOUND);
      }

      const venueExist = await this.venueService.findOneByVenueName(createUserDto.venueName);
      if (venueExist) {
        throw new BadRequestException(VenueMessages.FOUND);
      }

      const venueName = createUserDto.venueName;
      delete createUserDto.venueName;
      const user = await this.userRepository.create({
        ...createUserDto,
      });
      this.venueService.create({ venueOperatorId: user.id, name: venueName });
      const otp = this.generateUniqueOtp();
      const updatedUser = await this.userRepository.update(user.id, {
        otp,
        otp_expire: new Date(Date.now() + 60 * 60 * 50),
      });
      const data = { NAME: `${user.firstName} ${user.lastName}`, EMAIL: user.email, LINK: otp, EXPIRY: '3h' };
      const mailParams = {
        subject: 'Account verification',
        templatePath: join(__dirname, '../../mailTemplate/accountVerificationEmailTemplate.html'),
        data,
      };

      await sendEmail('dipali.rangpariya@azilen.com', mailParams);
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        email: createUserDto.email,
      });

      if (!user) {
        throw new BadRequestException(UserMessages.NOT_FOUND);
      }

      if (!(await compare(createUserDto.password, user.password))) {
        throw new BadRequestException(UserMessages.WRONG_PASSWORD);
      }
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: resetPasswordDto.userId });

    if (!user) {
      throw new BadRequestException(UserMessages.NOT_FOUND);
    }

    if (resetPasswordDto.confirmPassword != resetPasswordDto.password) {
      throw new BadRequestException(UserMessages.NOT_MATCH);
    }

    user.password = await hash(resetPasswordDto.confirmPassword, 10);
    await this.update(user.id, user);
    return user;
  }

  // public async forgotPassword(email: string): Promise<UserEntity> {
  //   const user = await this.userRepository.findOne({
  //     otp: otp,
  //   });
  //   this.throwUnauthorizedException(user);
  //   return user;
  // }
  async createLocationOperator(createUserDto: LocationOperatorDto) {
    try {
      const user = await this.userRepository.findOne({ email: createUserDto.email });
      if (user) {
        throw new ForbiddenException(UserMessages.FOUND);
      }

      const role = await this.roleService.findOneByRole(ROLE.LOCATION_OPERATOr);
      createUserDto.roleId = role.id;

      return await this.userRepository.create({
        ...createUserDto,
      });
    } catch (error: unknown) {
      throw error;
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
  public async verifyOtp(otpRequestDto: OtpRequestDto): Promise<boolean> {
    const user = await this.userRepository.findOne({
      id: otpRequestDto.userId,
    });
    if (!user) {
      throw new BadRequestException(UserMessages.NOT_FOUND);
    }
    if (user.otp != otpRequestDto.otp) {
      throw new BadRequestException(UserMessages.OTP_INVALID);
    }
    const date = new Date();
    if (user && date > user.otp_expire) {
      throw new BadRequestException(UserMessages.OTP_EXPIRED);
    }
    return true;
  }

  generateUniqueOtp(): string {
    let otp: string;
    do {
      otp = Math.floor(1000 + Math.random() * 9000).toString(); // Ensure OTP is a string
    } while (this.generatedOtps.has(otp));

    this.generatedOtps.add(otp);
    return otp;
  }
  async emailSend(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        throw new BadRequestException('Email not found');
      }
      const otp = this.generateUniqueOtp();
      const updatedUser = await this.userRepository.update(user.id, {
        otp,
        otp_expire: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });
      const data = { NAME: `${user.firstName} ${user.lastName}`, EMAIL: user.email, LINK: otp, EXPIRY: '3h' };
      const mailParams = {
        subject: 'Account verification',
        templatePath: join(__dirname, '../../mailTemplate/accountVerificationEmailTemplate.html'),
        data,
      };

      await sendEmail('dipali.rangpariya@azilen.com', mailParams);
      return updatedUser;
    } catch (error) {
      throw error;
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

  // public async resetPassword(userId: string, password: string): Promise<UserEntity> {
  //   const user = await this.findOne(userId);
  //   // user.credentials.updatePassword(user.password);
  //   user.password = await hash(password, 10);
  //   // await this.commonService.saveEntity(this.userRepository, user);
  //   return user;
  // }

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

  public async findUserWithRole(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserWithRole(id);
    return user;
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
