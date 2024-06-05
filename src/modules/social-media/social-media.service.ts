import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { CreateSocialMediaDto } from './dto/request-social-media.dto';
import { SocialMediaEntity } from './entities/social-media.entity';
import { SocialMediaRepository } from './social-media.repository';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { SocialMediaMessages } from './constants/social-media.messages';

@Injectable()
export class SocialMediaService extends CommonService<SocialMediaEntity> {
  constructor(private socialMediaRepository: SocialMediaRepository) {
    super(socialMediaRepository);
  }
  async create(createSocialMediaDto: CreateSocialMediaDto): Promise<SocialMediaEntity> {
    return await this.socialMediaRepository.create(createSocialMediaDto);
  }

  async findOne(id: string) {
    return this.socialMediaRepository.findOne({ id });
  }

  async update(id: string, updateSocialMediaDto: UpdateSocialMediaDto) {
    const entity = await this.socialMediaRepository.findOne({ id });

    if (!entity) {
      throw new Error(SocialMediaMessages.NOT_FOUND);
    }

    Object.assign(entity, updateSocialMediaDto);

    await this.socialMediaRepository.update(entity);
  }
}
