import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/request-venue.dto';
import { UpdateVenueDto } from './dto/response-venue.dto';
import { VenueEntity } from './entities/venue.entity';
import { CommonService } from '../../common/common.service';
import { VenueRepository } from './venue.repository';

@Injectable()
export class VenueService extends CommonService<VenueEntity> {
  constructor(private venueRepository: VenueRepository) {
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

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
