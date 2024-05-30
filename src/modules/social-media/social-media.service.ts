import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { CreateSocialMediaDto } from './dto/request-social-media.dto';
import { SocialMediaEntity } from './entities/social-media.entity';
import { SocialMediaRepository } from './social-media.repository';

@Injectable()
export class SocialMediaService extends CommonService<SocialMediaEntity> {
  constructor(private socialMediaRepository: SocialMediaRepository) {
    super(socialMediaRepository);
  }
  async create(createSocialMediaDto: CreateSocialMediaDto): Promise<SocialMediaEntity> {
    return await this.socialMediaRepository.create(createSocialMediaDto);
  }
}
