import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/request-client.dto';
import { UpdateClientDto } from './dto/request-client.dto';
import { CommonService } from '../../common/common.service';
import { isNull, isUndefined } from '../../utils/validation.util';
import { compare, hash } from 'bcrypt';
import * as crypto from 'crypto';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService extends CommonService<ClientEntity> {
  constructor(private clientRepository: ClientRepository) {
    super(clientRepository);
  }

  async createClient(createClientDto: CreateClientDto) {
    createClientDto.clientId = this.generateClientId();
    createClientDto.secret = this.generateClientSecret();

    return this.clientRepository.create(createClientDto);
  }

  private generateClientId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private generateClientSecret(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // async create(createClientDto: CreateClientDto) {
  //   try {
  //     return await this.clientRepository.create({
  //       ...createClientDto,
  //     });
  //   } catch (error: unknown) {
  //     throw new Error();
  //   }
  // }

  public async findOneByEmail(clientId: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      clientId: clientId.toLowerCase(),
    });
    this.throwUnauthorizedException(client);
    return client;
  }

  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.findAll();
    } catch (error: any) {
      throw new Error();
    }
  }

  public async confirmEmail(clientId: string): Promise<ClientEntity> {
    const client = await this.findOneByCredentials(clientId);

    // if (client.confirmed) {
    //   throw new BadRequestException('Email already confirmed');
    // }

    // client.confirmed = true;
    // await this.commonService.saveEntity(this.clientRepository, client);
    return client;
  }

  private throwUnauthorizedException(client: undefined | null | ClientEntity): void {
    if (isUndefined(client) || isNull(client)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public async resetPassword(clientId: string, password: string): Promise<ClientEntity> {
    const client = await this.findOne(clientId);
    // client.credentials.updatePassword(client.password);
    // client.password = await hash(password, 10);
    // await this.commonService.saveEntity(this.clientRepository, client);
    return client;
  }

  // public async uncheckedClientByEmail(email: string): Promise<ClientEntity> {
  //   return this.clientRepository.findOne({
  //     // email: email.toLowerCase(),
  //   });
  // }

  public async findOneByCredentials(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ id });
    return client;
  }

  async findOne(id: string) {
    return this.clientRepository.findOne({ id });
  }

  async findByEmail(email: string) {
    return this.clientRepository.findOneByEmail(email);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.clientRepository.update(id, updateClientDto);
  }

  // public async findClientWithRole(id: string): Promise<ClientEntity> {
  //   const client = await this.clientRepository.findClientWithRole(id);
  //   return client;
  // }

  public async findOneById(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ id });
    return client;
  }

  public async updatePassword(clientId: string, password: string, newPassword: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ id: clientId });

    // if (!(await compare(password, client.password))) {
    //   throw new BadRequestException('Wrong password');
    // }
    // if (await compare(newPassword, client.password)) {
    //   throw new BadRequestException('New password must be different');
    // }
    // client.password = await hash(newPassword, 10);
    await this.update(client.id, client);
    return client;
  }

  async remove(id: string) {
    await this.clientRepository.delete(id);
  }
}
