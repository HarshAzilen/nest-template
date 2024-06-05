import { CommonRepository } from '../../common/common.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SocialMediaEntity } from './entities/social-media.entity';
import { CreateSocialMediaDto } from './dto/request-social-media.dto';
import { NullableType } from '../../utils/types/nullable.type';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { SocialMediaMessages } from './constants/social-media.messages';

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

  async findOne(fields: EntityCondition<SocialMediaEntity>): Promise<NullableType<SocialMediaEntity>> {
    const socialMedia = await this.socialMediaRepository.findOne({
      where: fields as FindOptionsWhere<SocialMediaEntity>,
    });
    return socialMedia;
  }

  async update(entity: Partial<SocialMediaEntity>): Promise<SocialMediaEntity> {
    return await this.socialMediaRepository.save(entity);
  }
}
