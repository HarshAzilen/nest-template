import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './request-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
