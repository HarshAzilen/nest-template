import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express-serve-static-core';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Origin } from './decorators/origin.decorator';
import { Public } from './decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthResult } from './interfaces/auth-result.interface';
import { AuthRoutes } from './constants/auth.routes';
import { CreateUserDto } from '../user/dto/request-user.dto';

@ApiTags('Auth')
@Controller('api/auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  // private readonly cookiePath = '/api/auth';
  // private readonly cookieName: string;
  // private readonly refreshTime: number;
  // private readonly testing: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    // this.cookieName = this.configService.get<string>('REFRESH_COOKIE');
    // this.refreshTime = this.configService.get<number>('jwt.refresh.time');
    // this.testing = this.configService.get<boolean>('testing');
  }

  @Public()
  @Post(AuthRoutes.SIGN_UP)
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<void> {
    await this.authService.signUp(createUserDto);
  }

  @Public()
  @Post(AuthRoutes.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  public async signIn(
    // @Res() res: Response,
    @Body() singInDto: SignInDto,
  ): Promise<IAuthResult> {
    return await this.authService.signIn(singInDto);

    // this.saveRefreshCookie(regenerateTokengenerateTokens, result.refreshToken)
    //   .status(HttpStatus.OK)
    //   .json(AuthResponseMapper.map(result));
  }

  @Public()
  @Post(AuthRoutes.REFRESH_ACCESS)
  public async refreshAccess(@Req() req: Request, @Res() res: Response): Promise<void> {
    // const token = this.refreshTokenFromReq(req);
    const token = req.body.token;
    const result = await this.authService.refreshTokenAccess(token);
    // this.saveRefreshCookie(res, result.refreshToken).status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  }

  @Post(AuthRoutes.LOGOUT)
  public async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    // const token = this.refreshTokenFromReq(req);
    // const message = await this.authService.logout(token);
    res.status(HttpStatus.OK).json('Logout successfully');
    // res.clearCookie(this.cookieName, { path: this.cookiePath }).status(HttpStatus.OK).json(message);
  }

  @Public()
  @Post(AuthRoutes.CONFIRM_EMAIL)
  public async confirmEmail(
    @Origin() origin: string | undefined,
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.confirmEmail(confirmEmailDto);

    // this.saveRefreshCookie(res, result.refreshToken).status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  }

  @Public()
  @Post(AuthRoutes.FORGOT_PASSWORD)
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(@Origin() origin: string | undefined, @Body() emailDto: EmailDto): Promise<void> {
    this.authService.resetPasswordEmail(emailDto, origin);
  }

  // @Public()
  // @Post(AuthRoutes.RESET_PASSWORD)
  // @HttpCode(HttpStatus.OK)
  // public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }

  @Patch(AuthRoutes.UPDATE_PASSWORD)
  @HttpCode(HttpStatus.OK)
  public async updatePassword(
    @CurrentUser() userId: string,
    @Origin() origin: string | undefined,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.updatePassword(userId, changePasswordDto, origin);
  }

  @Get(AuthRoutes.ME)
  @HttpCode(HttpStatus.OK)
  public async getMe(@CurrentUser() id: string): Promise<void> {
    await this.userService.findOneById(id);
  }

  // private refreshTokenFromReq(req: Request): string {
  //   const token: string | undefined = req.signedCookies[this.cookieName];

  //   if (isUndefined(token)) {
  //     throw new UnauthorizedException();
  //   }

  //   return token;
  // }

  // private saveRefreshCookie(res: Response, refreshToken: string): Response {
  //   return res.cookie(this.cookieName, refreshToken, {
  //     secure: !this.testing,
  //     httpOnly: true,
  //     sameSite: 'strict',
  //     signed: true,
  //     path: this.cookiePath,
  //     expires: new Date(Date.now() + this.refreshTime * 1000),
  //   });
  // }
}
