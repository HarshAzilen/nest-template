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
} from '@nestjs/common';

import { apiResponse } from '../../utils/response-helper';
import { UserMessages } from './constants/user.messages';
import { CreateUserDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';

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

  @Get('send_email')
  @HttpCode(HttpStatus.OK)
  async emailSend() {
    try {
      await this.userService.emailSend();
      return apiResponse(HttpStatus.OK, UserMessages.List);
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
