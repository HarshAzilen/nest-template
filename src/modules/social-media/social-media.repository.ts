import { CommonRepository } from '../../common/common.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialMediaEntity } from './entities/social-media.entity';
import { CreateSocialMediaDto } from './dto/request-social-media.dto';

export class SocialMediaRepository extends CommonRepository<SocialMediaEntity> {
  constructor(
    @InjectRepository(SocialMediaEntity)
    private readonly socialMediaRepository: Repository<SocialMediaEntity>,
  ) {
    super(socialMediaRepository);
  }

  async create(data: CreateSocialMediaDto): Promise<SocialMediaEntity> {
    return await this.socialMediaRepository.save(data);
  }
}
