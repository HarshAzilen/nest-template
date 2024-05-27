import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { isEmail } from 'class-validator';
import dayjs from 'dayjs';
import { SLUG_REGEX } from '../../utils/constants/regex.constant';
import { isNull, isUndefined } from '../../utils/validation.util';
import { TokenTypeEnum } from '../jwt/enums/token-type.enum';
import { IEmailToken } from '../jwt/interfaces/email-token.interface';
import { IRefreshToken } from '../jwt/interfaces/refresh-token.interface';
import { JwtService } from '../jwt/jwt.service';
import { CreateUserDto, ICredentials } from '../user/dto/request-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthResult } from './interfaces/auth-result.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async signUp(dto: CreateUserDto): Promise<void> {
    await this.userService.create(dto);
    // const { email, firstName, lastName, phoneNo } = dto;
    // this.comparePasswords(password1, password2);
    // const user = await this.userService.create({
    // email: email,
    // firstName: firstName,
    // lastName: lastName,
    // });
    // const user = await this.userService.create({});
    // return await this.jwtService.generateToken(user, TokenTypeEnum.CONFIRMATION);
    // return await this.jwtService.generateToken(user, TokenTypeEnum.);
  }

  // public async signUp(dto: SignUpDto, domain?: string): Promise<string> {
  //   const { name, email, password1, password2 } = dto;
  //   this.comparePasswords(password1, password2);
  //   const user = await this.userService.create({
  //     email: email,
  //     name: name,
  //     password: password1,
  //   });
  //   return await this.jwtService.generateToken(user, TokenTypeEnum.CONFIRMATION, domain);
  // }

  public async confirmEmail(dto: ConfirmEmailDto, domain?: string): Promise<IAuthResult> {
    const { confirmationToken } = dto;
    const { id, version } = await this.jwtService.verifyToken<IEmailToken>(
      confirmationToken,
      TokenTypeEnum.CONFIRMATION,
    );
    const user = await this.userService.confirmEmail(id);
    const [accessToken, refreshToken] = await this.generateAuthTokens(user, domain);
    return { accessToken, refreshToken };
  }

  public async signIn(dto: SignInDto): Promise<IAuthResult> {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email);
    await this.userByEmailOrUsername(email);

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('wrong password');
    }
    // if (!user.confirmed) {
    // const confirmationToken = await this.jwtService.generateToken(user, TokenTypeEnum.CONFIRMATION, domain);
    // throw new UnauthorizedException('Please confirm your email, a new email has been sent');
    // }

    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    return { accessToken, refreshToken };
  }

  public async refreshTokenAccess(refreshToken: string): Promise<IAuthResult> {
    const { id, tokenId } = await this.jwtService.verifyToken<IRefreshToken>(refreshToken, TokenTypeEnum.REFRESH);
    await this.checkIfTokenIsBlacklisted(id, tokenId);
    const user = await this.userService.findOneByCredentials(id);
    const [accessToken, newRefreshToken] = await this.generateAuthTokens(user, tokenId);
    return { accessToken, refreshToken: newRefreshToken };
  }

  public async logout(refreshToken: string): Promise<void> {
    const { id, tokenId, exp } = await this.jwtService.verifyToken<IRefreshToken>(refreshToken, TokenTypeEnum.REFRESH);
    await this.blacklistToken(id, tokenId, exp);
  }

  public async resetPasswordEmail(dto: EmailDto, domain?: string): Promise<void> {
    const user = await this.userService.uncheckedUserByEmail(dto.email);

    if (!isUndefined(user) && !isNull(user)) {
      const resetToken = await this.jwtService.generateToken(user, TokenTypeEnum.RESET_PASSWORD, domain);
    }
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const { password1, password2, resetToken } = dto;
    const { id, version } = await this.jwtService.verifyToken<IEmailToken>(resetToken, TokenTypeEnum.RESET_PASSWORD);
    this.comparePasswords(password1, password2);
    await this.userService.resetPassword(id, password1);
  }

  public async updatePassword(userId: string, dto: ChangePasswordDto, domain?: string): Promise<IAuthResult> {
    const { password1, password2, password } = dto;
    this.comparePasswords(password1, password2);
    const user = await this.userService.updatePassword(userId, password, password1);
    const [accessToken, refreshToken] = await this.generateAuthTokens(user, domain);
    return { accessToken, refreshToken };
  }

  private async checkLastPassword(credentials: ICredentials, password: string): Promise<void> {
    const { lastPassword, passwordUpdatedAt } = credentials;

    if (lastPassword.length === 0 || !(await compare(password, lastPassword))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const now = dayjs();
    const time = dayjs.unix(passwordUpdatedAt);
    const months = now.diff(time, 'month');
    const message = 'You changed your password ';

    if (months > 0) {
      throw new UnauthorizedException(message + months + (months > 1 ? ' months ago' : ' month ago'));
    }

    const days = now.diff(time, 'day');

    if (days > 0) {
      throw new UnauthorizedException(message + days + (days > 1 ? ' days ago' : ' day ago'));
    }

    const hours = now.diff(time, 'hour');

    if (hours > 0) {
      throw new UnauthorizedException(message + hours + (hours > 1 ? ' hours ago' : ' hour ago'));
    }

    throw new UnauthorizedException(message + 'recently');
  }

  private async checkIfTokenIsBlacklisted(userId: string, tokenId: string): Promise<void> {
    // const time = await this.cacheManager.get<number>(`blacklist:${userId}:${tokenId}`);
    // if (!isUndefined(time) && !isNull(time)) {
    //   throw new UnauthorizedException('Invalid token');
    // }
  }

  private async blacklistToken(userId: string, tokenId: string, exp: number): Promise<void> {
    const now = dayjs().unix();
    const ttl = (exp - now) * 1000;

    // if (ttl > 0) {
    //   await this.commonService.throwInternalError(this.cacheManager.set(`blacklist:${userId}:${tokenId}`, now, ttl));
    // }
  }

  private comparePasswords(password1: string, password2: string): void {
    if (password1 !== password2) {
      throw new BadRequestException('Passwords do not match');
    }
  }

  private async userByEmailOrUsername(email: string): Promise<UserEntity> {
    if (email.includes('@')) {
      if (!isEmail(email)) {
        throw new BadRequestException('Invalid email');
      }

      return this.userService.findOneByEmail(email);
    }
  }

  private async generateAuthTokens(user: UserEntity, tokenId?: string): Promise<[string, string]> {
    return Promise.all([
      this.jwtService.generateToken(user, TokenTypeEnum.ACCESS, tokenId),
      this.jwtService.generateToken(user, TokenTypeEnum.REFRESH, tokenId),
    ]);
  }
}
