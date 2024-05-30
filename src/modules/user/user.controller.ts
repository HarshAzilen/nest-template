import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiResponse } from '../../utils/types/response.type';
import { apiResponse } from '../../utils/response-helper';
import { UserMessages } from './constants/user.messages';
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
      await this.userService.resetPassword(resetPasswordDto);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL);
    } catch (error) {
      throw error;
    }
  }

  // @Post('forgot-password')
  // async forgotPassword(@Body('email') email: string): Promise<ApiResponse<UserEntity>> {
  //   try {
  //     await this.userService.resetPassword(email);
  //     return apiResponse(HttpStatus.OK, UserMessages.EMAIL);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const user = await this.userService.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }
}
