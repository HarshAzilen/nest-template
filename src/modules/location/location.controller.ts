import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { apiResponse } from '../../utils/response-helper';
import { LocationMessages } from './constants/location.messages';
import { LocationRoutes } from './constants/location.routes';
import { LocationDto } from './dto/request-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@Controller(LocationRoutes.LOCATION)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createLocationDto: LocationDto) {
    try {
      const location = await this.locationService.create(createLocationDto);
      return apiResponse(HttpStatus.OK, LocationMessages.CREATE, location);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
