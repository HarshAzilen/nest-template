import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { SetResponseMessage } from '../utils/response-format.interceptor';

@UseGuards(JwtAuthGuard)
@SerializeOptions({ strategy: 'excludeAll' })
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @SetResponseMessage('Create a new post')
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @AuthUser() authUser: AuthUser) {
    return this.postService.create(createPostDto, authUser.id);
  }
  @Post()
  async upload(@Body() createPostDto: CreatePostDto) {
    return this.postService.getData;
  }
  @SetResponseMessage('Get all posts')
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @SetResponseMessage('Get post details')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const post = await this.postService.findOne(uuid);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  @SetResponseMessage('Update post')
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(uuid, updatePostDto);
  }

  @SetResponseMessage('Delete post')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.postService.remove(uuid);
  }
}
