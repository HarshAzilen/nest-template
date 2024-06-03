import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { SocialMediaService } from '../social-media/social-media.service';
import { UserService } from '../user/user.service';
import { LocationDto } from './dto/request-location.dto';
import { LocationEntity } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { LocationMessages } from './constants/location.messages';

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
        locationOperatorId: locationOperator.id,
        mediaId: media.id,
        venueOperatorId: venue_operator_id,
      };
      return this.locationRepository.create(locationDto);
    } catch (error: unknown) {
      throw error;
    }
  }

  async get(venueOperatorId: string): Promise<LocationEntity[]> {
    try {
      return await this.locationRepository.findWithColumn({ venueOperatorId });
    } catch (error: unknown) {
      throw error;
    }
  }
  async getById(id: string): Promise<LocationEntity> {
    try {
      const location = await this.locationRepository.findOne({ id });
      if (!location) {
        throw new BadRequestException(LocationMessages.NOT_FOUND);
      }
      return location;
    } catch (error: unknown) {
      throw error;
    }
  }
}
