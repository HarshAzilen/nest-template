import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { NullableType } from '../../utils/types/nullable.type';
import { CommonRepository } from '../../common/common.repository';
import { CreateClientDto } from './dto/request-client.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';

@Injectable()
export class ClientRepository extends CommonRepository<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
    super(clientRepository);
  }

  async create(data: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(data);
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async findClientWithDetails(id: string): Promise<ClientEntity> {
    return await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.details', 'details')
      .select(['client.id AS "id"', 'details.info AS "details"'])
      .where('client.id = :id', { id: id })
      .getRawOne();
  }

  async update(id: string, payload: Partial<ClientEntity>): Promise<ClientEntity> {
    const entity = await this.clientRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Client not found');
    }

    return await this.clientRepository.save({ ...entity, ...payload });
  }

  async findOneByEmail(clientId: string): Promise<NullableType<ClientEntity>> {
    return await this.clientRepository.findOne({ where: { clientId: clientId } });
  }

  async findOne(fields: EntityCondition<ClientEntity>): Promise<NullableType<ClientEntity>> {
    return await this.clientRepository.findOne({
      where: fields as FindOptionsWhere<ClientEntity>,
    });
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.clientRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found for deletion`);
    }
  }
}
