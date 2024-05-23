import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  SerializeOptions,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SetResponseMessage } from '../../utils/response-format.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/response-user.dto';

@UseGuards(JwtAuthGuard)
@SerializeOptions({ strategy: 'excludeAll' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetResponseMessage('Create a new user')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SetResponseMessage('Get all users')
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @SetResponseMessage('Get user details')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const user = await this.userService.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @SetResponseMessage('Update user')
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(uuid, updateUserDto);
    return this.findOne(uuid);
  }

  @SetResponseMessage('Delete user')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }
}
