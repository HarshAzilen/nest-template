import { PartialType } from '@nestjs/swagger';
import { CreateSocialMediaDto } from './request-social-media.dto';

export class UpdateSocialMediaDto extends PartialType(CreateSocialMediaDto) {}
