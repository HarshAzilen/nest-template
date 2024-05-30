import { CommonRepository } from '../../common/common.repository';
import { LocationEntity } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/request-location.dto';

export class LocationRepository extends CommonRepository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super(locationRepository);
  }

  async create(data: CreateLocationDto): Promise<LocationEntity> {
    return await this.locationRepository.save(data);
  }
}
