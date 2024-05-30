import { CommonRepository } from '../../common/common.repository';
import { LocationEntity } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/request-location.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { NullableType } from '../../utils/types/nullable.type';

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
  async findOne(fields: EntityCondition<LocationEntity>): Promise<NullableType<LocationEntity>> {
    const user = await this.locationRepository.findOne({
      where: fields as FindOptionsWhere<LocationEntity>,
    });
    return user;
  }
  async findWithColumn(fields: EntityCondition<LocationEntity>): Promise<NullableType<LocationEntity[]>> {
    const user = await this.locationRepository.find({
      where: fields as FindOptionsWhere<LocationEntity>,
    });
    return user;
  }
}
