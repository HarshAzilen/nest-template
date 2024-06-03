import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { apiResponse } from '../../utils/response-helper';
import { ApiResponse } from '../../utils/types/response.type';
import { UserMessages } from './constants/user.messages';
import { UserRoutes } from './constants/user.routes';
import { CreateUserDto, OtpRequestDto, ResetPasswordDto } from './dto/request-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL);
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-in')
  async signIn(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.signIn(createUserDto);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL, user);
    } catch (error) {
      throw error;
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otpRequestDto: OtpRequestDto): Promise<ApiResponse<UserEntity>> {
    try {
      await this.userService.verifyOtp(otpRequestDto);
      return apiResponse(HttpStatus.OK, UserMessages.OTP_VERIFIED);
    } catch (error) {
      throw error;
    }
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.resetPassword(resetPasswordDto);
      let message: string;
      if (user.isVerified === false) {
      } else {
        message = UserMessages.REGISTERED;
        message = UserMessages.RESET_PASSWORD;
      }
      return apiResponse(HttpStatus.OK, message);
    } catch (error) {
      throw error;
    }
  }

  @Get('send-otp/:email')
  @HttpCode(HttpStatus.OK)
  async emailSend(@Param('email') email: string): Promise<ApiResponse<UserEntity>> {
    try {
      await this.userService.emailSend(email);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL);
    } catch (error) {
      throw error;
    }
  }

  @Get(UserRoutes.SEARCH)
  @HttpCode(HttpStatus.OK)
  async search(
    @Param('email') email: string,
    @Body('venueOperatorId') venueOperatorId: string,
  ): Promise<ApiResponse<UserEntity[]>> {
    try {
      const user = await this.userService.searchByEmail(email, venueOperatorId);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL, user);
    } catch (error) {
      throw error;
    }
  }

  @Get(UserRoutes.VERIFY_OPERATOR)
  @HttpCode(HttpStatus.OK)
  async verifyOperator(
    @Param('email') email: string,
    @Body('venueOperatorId') venueOperatorId: string,
  ): Promise<ApiResponse<string>> {
    try {
      const user = await this.userService.verifyOperator(email, venueOperatorId);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL, user);
    } catch (error) {
      throw error;
    }
  }
}
