import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaRepository } from './social-media.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaEntity } from './entities/social-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMediaEntity])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService, SocialMediaRepository],
  exports: [SocialMediaService],
})
export class SocialMediaModule {}
