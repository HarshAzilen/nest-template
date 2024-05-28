import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { apiResponse } from '../../utils/response-helper';
import { UserMessages } from './constants/user.messages';
import { CreateUserDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';
import { ApiResponse } from 'src/utils/types/response.type';
import { UserEntity } from './entities/user.entity';

// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('send_otp/:email')
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
