import { Injectable } from '@nestjs/common';
import { CreateLocationDto, LocationDto } from './dto/request-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CommonService } from '../../common/common.service';
import { LocationEntity } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { UserService } from '../user/user.service';
import { SocialMediaRepository } from '../social-media/social-media.repository';

@Injectable()
export class LocationService extends CommonService<LocationEntity> {
  constructor(
    private locationRepository: LocationRepository,
    private readonly userService: UserService,
    private readonly socialMediaRepository: SocialMediaRepository,
  ) {
    super(locationRepository);
  }
  async create(createLocationDto: LocationDto): Promise<LocationEntity> {
    const { location, contact, socialMedia, venue_operator_id } = createLocationDto;

    const location_operator = await this.userService.createLocationOperator(contact);
    const media = await this.socialMediaRepository.create(socialMedia);
    const locationDto = {
      ...location,
      location_operator_id: location_operator.id,
      mediaId: media.id,
      venue_operator_id,
    };
    return this.locationRepository.create(locationDto);
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
