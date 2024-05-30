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

  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientService.createClient(createClientDto);
    } catch (error: any) {
      throw new BadRequestException('Invalid email');
    }
  }

  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const client = await this.clientService.findOne(uuid);
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateClientDto: UpdateClientDto) {
    await this.clientService.update(uuid, updateClientDto);
    return this.findOne(uuid);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.clientService.remove(uuid);
  }
}
