import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { VenueEntity } from './entities/venue.entity';
import { NullableType } from '../../utils/types/nullable.type';
import { CommonRepository } from '../../common/common.repository';
import { CreateVenueDto } from './dto/request-venue.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';

@Injectable()
export class VenueRepository extends CommonRepository<VenueEntity> {
  constructor(
    @InjectRepository(VenueEntity)
    private readonly venueRepository: Repository<VenueEntity>,
  ) {
    super(venueRepository);
  }

  async create(data: CreateVenueDto): Promise<VenueEntity> {
    return await this.venueRepository.save(data);
  }

  async findAll(): Promise<VenueEntity[]> {
    return await this.venueRepository.find();
  }

  async findVenueWithLocation(id: string): Promise<VenueEntity> {
    return await this.venueRepository
      .createQueryBuilder('venue')
      .leftJoinAndSelect('venue.location', 'location')
      .select(['venue.id AS "id"', 'location.address AS "address"'])
      .where('venue.id = :id', { id })
      .getRawOne();
  }

  async update(id: string, payload: Partial<VenueEntity>): Promise<VenueEntity> {
    const entity = await this.venueRepository.findOne({ where: { id } });

    if (!entity) {
      throw new Error('Venue not found');
    }

    Object.assign(entity, payload);

    return await this.venueRepository.save(entity);
  }

  async findOneByName(name: string): Promise<NullableType<VenueEntity>> {
    return await this.venueRepository.findOne({ where: { name } });
  }

  async findOne(fields: EntityCondition<VenueEntity>): Promise<NullableType<VenueEntity>> {
    const venue = await this.venueRepository.findOne({
      where: fields as FindOptionsWhere<VenueEntity>,
    });
    return venue;
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.venueRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Venue with ID ${id} not found for deletion`);
    }
  }
}
