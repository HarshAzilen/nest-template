import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './request-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
