import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class PostService extends CommonService<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {
    super(postRepository);
  }
  async create(createPostDto: CreatePostDto, userId: number) {
    const newPost = this.postRepository.create({
      uuid: uuid(),
      user: { id: userId },
      ...createPostDto,
    });
    return this.postRepository.save(newPost);
  }

  async findAll() {
    return this.postRepository.find();
  }

  async findOne(uuid: string) {
    return this.postRepository.findOneBy({ uuid });
  }

  async findByUserUuid(uuid: string) {
    return this.postRepository.findBy({ user: { uuid } });
  }

  async update(uuid: string, updatePostDto: UpdatePostDto) {
    await this.postRepository.update({ uuid }, updatePostDto);
  }

  async remove(uuid: string) {
    await this.postRepository.delete({ uuid });
  }
}
