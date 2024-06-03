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
import { UserService } from './user.service';
import { CreateUserDto, OtpRequestDto, ResetPasswordDto } from './dto/request-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRoutes } from './constants/user.routes';

// @UseGuards(JwtAuthGuard)
@Controller(UserRoutes.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(UserRoutes.VENUE_OPERATOR)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.create(createUserDto);
      return apiResponse(HttpStatus.CREATED, UserMessages.EMAIL, user);
    } catch (error) {
      throw error;
    }
  }

  @Post(UserRoutes.SIGN_IN)
  async signIn(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.signIn(createUserDto);
      return apiResponse(HttpStatus.OK, UserMessages.EMAIL, user);
    } catch (error) {
      throw error;
    }
  }

  @Post(UserRoutes.VERIFY_OTP)
  async verifyOtp(@Body() otpRequestDto: OtpRequestDto): Promise<ApiResponse<UserEntity>> {
    try {
      await this.userService.verifyOtp(otpRequestDto);
      return apiResponse(HttpStatus.OK, UserMessages.OTP_VERIFIED);
    } catch (error) {
      throw error;
    }
  }

  @Put(UserRoutes.RESET_PASSWORD)
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

  @Get(UserRoutes.SEND_OTP)
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
