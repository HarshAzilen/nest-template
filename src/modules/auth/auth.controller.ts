import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express-serve-static-core';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Origin } from './decorators/origin.decorator';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthResult } from './interfaces/auth-result.interface';
import { AuthResponseMapper } from './mappers/auth-response.mapper';

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
  @Post('/sign-up')
  @ApiConflictResponse({
    description: 'Email already in use',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body',
  })
  public async signUp(@Origin() origin: string | undefined, @Body() signUpDto: SignUpDto): Promise<string> {
    return await this.authService.signUp(signUpDto, origin);
  }

  @Public()
  @Post('/sign-in')
  @ApiOkResponse({
    type: AuthResponseMapper,
    description: 'Logs in the user and returns the access token',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or User is not confirmed',
  })
  public async signIn(
    @Res() res: Response,
    @Origin() origin: string | undefined,
    @Body() singInDto: SignInDto,
  ): Promise<IAuthResult> {
    return await this.authService.signIn(singInDto, origin);

    // this.saveRefreshCookie(regenerateTokengenerateTokens, result.refreshToken)
    //   .status(HttpStatus.OK)
    //   .json(AuthResponseMapper.map(result));
  }

  @Public()
  @Post('/refresh-access')
  @ApiOkResponse({
    type: AuthResponseMapper,
    description: 'Refreshes and returns the access token',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body, or Token is invalid or expired',
  })
  public async refreshAccess(@Req() req: Request, @Res() res: Response): Promise<void> {
    // const token = this.refreshTokenFromReq(req);
    const token = req.body.token;
    const result = await this.authService.refreshTokenAccess(token, req.headers.origin);
    // this.saveRefreshCookie(res, result.refreshToken).status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  }

  @Post('/logout')
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
  })
  public async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    // const token = this.refreshTokenFromReq(req);
    // const message = await this.authService.logout(token);
    res.status(HttpStatus.OK).json('Logout successfully');
    // res.clearCookie(this.cookieName, { path: this.cookiePath }).status(HttpStatus.OK).json(message);
  }

  // @Public()
  // @Post('/confirm-email')
  // @ApiOkResponse({
  //   type: AuthResponseMapper,
  //   description: 'Confirms the user email and returns the access token',
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'Invalid token',
  // })
  // @ApiBadRequestResponse({
  //   description: 'Something is invalid on the request body, or Token is invalid or expired',
  // })
  // public async confirmEmail(
  //   @Origin() origin: string | undefined,
  //   @Body() confirmEmailDto: ConfirmEmailDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   return await this.authService.confirmEmail(confirmEmailDto);

  // this.saveRefreshCookie(res, result.refreshToken).status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  // }

  // @Public()
  // @Post('/forgot-password')
  // @HttpCode(HttpStatus.OK)
  // public async forgotPassword(@Origin() origin: string | undefined, @Body() emailDto: EmailDto): Promise<IMessage> {
  //   return this.authService.resetPasswordEmail(emailDto, origin);
  // }

  // @Public()
  // @Post('/reset-password')
  // @HttpCode(HttpStatus.OK)
  // @ApiBadRequestResponse({
  //   description: 'Something is invalid on the request body, or Token is invalid or expired',
  // })
  // public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<IMessage> {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }

  // @Patch('/update-password')
  // @ApiOkResponse({
  //   type: AuthResponseMapper,
  //   description: 'The password has been updated',
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'The user is not logged in.',
  // })
  // public async updatePassword(
  //   @CurrentUser() userId: number,
  //   @Origin() origin: string | undefined,
  //   @Body() changePasswordDto: ChangePasswordDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const result = await this.authService.updatePassword(userId, changePasswordDto, origin);
  //   this.saveRefreshCookie(res, result.refreshToken).status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  // }

  // @Get('/me')
  // @ApiOkResponse({
  //   type: AuthResponseUserMapper,
  //   description: 'The user is found and returned.',
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'The user is not logged in.',
  // })
  // public async getMe(@CurrentUser() id: number): Promise<IAuthResponseUser> {
  //   const user = await this.userService.findOneById(id);
  //   return AuthResponseUserMapper.map(user);
  // }

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
