import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { apiResponse } from '../../utils/response-helper';
import { LocationMessages } from './constants/location.messages';
import { LocationRoutes } from './constants/location.routes';
import { LocationDto } from './dto/request-location.dto';
import { LocationService } from './location.service';
import { LocationEntity } from './entities/location.entity';
import { ApiResponse } from 'src/utils/types/response.type';

@Controller(LocationRoutes.LOCATION)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create(@Body() body: LocationDto): Promise<ApiResponse<LocationEntity>> {
    try {
      const location = await this.locationService.create(body);
      return apiResponse(HttpStatus.OK, LocationMessages.CREATE, location);
    } catch (error) {
      throw error;
    }
  }

  @Get(LocationRoutes.VENUE_OPERATOR_ID)
  @HttpCode(HttpStatus.OK)
  async get(@Param('venueOperatorId') venueOperatorId: string): Promise<ApiResponse<LocationEntity[]>> {
    try {
      const location = await this.locationService.get(venueOperatorId);
      return apiResponse(HttpStatus.OK, LocationMessages.GET, location);
    } catch (error) {
      throw error;
    }
  }
}
