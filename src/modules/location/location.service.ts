import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { SocialMediaService } from '../social-media/social-media.service';
import { UserService } from '../user/user.service';
import { LocationDto } from './dto/request-location.dto';
import { LocationEntity } from './entities/location.entity';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService extends CommonService<LocationEntity> {
  constructor(
    private locationRepository: LocationRepository,
    private readonly userService: UserService,
    private readonly socialMediaService: SocialMediaService,
  ) {
    super(locationRepository);
  }
  async create(createLocationDto: LocationDto): Promise<LocationEntity> {
    try {
      const { location, contact, socialMedia, venue_operator_id } = createLocationDto;
      const locationOperatorDto = {
        ...contact,
        addedBy: venue_operator_id,
      };
      const locationOperator = await this.userService.createLocationOperator(locationOperatorDto);
      const media = await this.socialMediaService.create(socialMedia);
      const locationDto = {
        ...location,
        location_operator_id: locationOperator.id,
        mediaId: media.id,
        venue_operator_id,
      };
      return this.locationRepository.create(locationDto);
    } catch (error: unknown) {
      throw error;
    }
  }

  async get(venueOperatorId: string): Promise<LocationEntity[]> {
    console.log('🚀 ~ LocationService ~ get ~ venueOperatorId:', venueOperatorId);
    try {
      return await this.locationRepository.findWithColumn({ venue_operator_id: venueOperatorId });
    } catch (error: unknown) {
      throw error;
    }
  }
}
