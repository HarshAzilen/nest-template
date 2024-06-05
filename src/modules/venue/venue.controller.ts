import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put, HttpCode } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto, UpdateVenueProfileDto } from './dto/request-venue.dto';
import { UpdateVenueDto } from './dto/response-venue.dto';
import { apiResponse } from '../../utils/response-helper';
import { ApiResponse } from '../../utils/types/response.type';
import { VenueEntity } from './entities/venue.entity';
import { VenueMessages } from './constants/venue.messages';
import { VenueRoutes } from './constants/venue.routes';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  // @Post()
  // async venueOperatorProfile(@Body() createUserDto: CreateVenueDto): Promise<ApiResponse<VenueEntity>> {
  //   try {
  //     const user = await this.venueService.create(createUserDto);
  //     return apiResponse(HttpStatus.CREATED, VenueMessages.EMAIL, user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Put(VenueRoutes.ID)
  @HttpCode(HttpStatus.OK)
  async updateVenueProfile(
    @Param('id') venueOperatorId: string,
    @Body() updateVenueProfileDto: UpdateVenueProfileDto,
  ): Promise<ApiResponse<VenueEntity>> {
    try {
      await this.venueService.updateProfile(venueOperatorId, updateVenueProfileDto);
      return apiResponse(HttpStatus.OK, VenueMessages.UPDATE);
    } catch (error) {
      throw error;
    }
  }

  @Get(VenueRoutes.PROFILE)
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') venueOperatorId: string): Promise<ApiResponse<VenueEntity>> {
    try {
      const venueOperator = await this.venueService.getVenueProfile(venueOperatorId);
      console.log('🚀 ~ VenueController ~ get ~ venueOperator:', venueOperator);
      return apiResponse(HttpStatus.OK, VenueMessages.GET, venueOperator);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
