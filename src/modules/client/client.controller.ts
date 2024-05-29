import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SetResponseMessage } from '../../utils/response-format.interceptor';
import { oauthServer } from '../oauth-server/oauth-server';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/request-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  // @SetResponseMessage('Create a new client')
  // @Post()
  // async create(@Body() createClientDto: CreateClientDto) {
  //   try {
  //     const token = oauthServer.authenticate({
  //       scope: ['read', 'write'],
  //       addAcceptedScopesHeader: true,
  //       addAuthorizedScopesHeader: true,
  //       allowBearerTokensInQueryString: true,
  //     });
  //     const client = this.clientService.create(createClientDto);
  //     return { token, client };
  //   } catch (error: any) {
  //     throw new BadRequestException('Invalid email');
  //   }
  // }

  @SetResponseMessage('Create a new client')
  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientService.createClient(createClientDto);
    } catch (error: any) {
      throw new BadRequestException('Invalid email');
    }
  }

  @SetResponseMessage('Get all clients')
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @SetResponseMessage('Get client details')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const client = await this.clientService.findOne(uuid);
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  @SetResponseMessage('Update client')
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateClientDto: UpdateClientDto) {
    await this.clientService.update(uuid, updateClientDto);
    return this.findOne(uuid);
  }

  @SetResponseMessage('Delete client')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.clientService.remove(uuid);
  }
}
