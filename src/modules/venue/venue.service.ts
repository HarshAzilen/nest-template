import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Exception } from 'handlebars';
import { CommonService } from '../../common/common.service';
import { SocialMediaService } from '../social-media/social-media.service';
import { UserService } from '../user/user.service';
import { VenueMessages } from './constants/venue.messages';
import { CreateVenueDto, UpdateVenueProfileDto } from './dto/request-venue.dto';
import { VenueEntity } from './entities/venue.entity';
import { VenueRepository } from './venue.repository';
import { SocialMediaEntity } from '../social-media/entities/social-media.entity';

@Injectable()
export class VenueService extends CommonService<VenueEntity> {
  constructor(
    private venueRepository: VenueRepository,
    private socialMediaService: SocialMediaService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super(venueRepository);
  }
  async create(createVenueDto: CreateVenueDto) {
    try {
      return await this.venueRepository.create({
        ...createVenueDto,
      });
    } catch (error: unknown) {
      throw new Error();
    }
  }

  findAll() {
    return `This action returns all venue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  public async findOneByVenueName(name: string): Promise<VenueEntity> {
    const venue = await this.venueRepository.findOne({
      name: name,
    });
    return venue;
  }

  async getVenueProfile(id: string): Promise<VenueEntity> {
    return await this.venueRepository.getVenueProfile(id);
  }

  async updateProfile(id: string, data: UpdateVenueProfileDto): Promise<void> {
    try {
      const venueOperator = await this.userService.findOne(id);
      console.log('🚀 ~ VenueService ~ updateProfile ~ venueOperator:', venueOperator);
      if (!venueOperator) {
        throw new BadRequestException(VenueMessages.VENUE_OPERATOR_NOT_FOUND);
      }
      const venue = await this.venueRepository.findOne({ venueOperatorId: id });
      console.log('🚀 ~ VenueService ~ updateProfile ~ venue:', venue);
      await this.userService.update(venueOperator.id, {
        firstName: data.contact.firstName,
        lastName: data.contact.lastName,
        phoneNo: data.contact.phoneNo,
        email: data.contact.email,
      });
      if (venue.media && data.socialMedia) {
        const socialMedia = await this.socialMediaService.findOne(venue.media);
        if (socialMedia) {
          Object.assign(socialMedia, data.socialMedia);
          await this.socialMediaService.update(venue.media, socialMedia);
        } else {
          await this.socialMediaService.update(venue.media, data.socialMedia);
        }
      }
      // console.log('🚀 ~ VenueService ~ updateProfile ~ socialMedia:', socialMedia);
      // let socialMediaObj: SocialMediaEntity;
      // if (socialMedia) {
      // }
      // console.log('🚀 ~ VenueService ~ updateProfile ~ socialMediaObj:', socialMediaObj);
      // console.log('🚀 ~ VenueService ~ updateProfile ~ socialMediaObj:', socialMediaObj);
      const updateVenueObj: VenueEntity = {} as VenueEntity;
      updateVenueObj.name = data.venue.name;
      updateVenueObj.description = data.venue.description;
      console.log('🚀 ~ VenueService ~ updateProfile ~ updateVenueObj:', updateVenueObj);
      await this.venueRepository.update(venue.id, updateVenueObj);
    } catch (error) {
      console.log('🚀 ~ VenueService ~ updateProfile ~ error:', error);
      throw new Exception(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
