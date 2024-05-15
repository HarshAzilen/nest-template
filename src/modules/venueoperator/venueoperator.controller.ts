import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueoperatorService } from './venueoperator.service';
import { CreateVenueoperatorDto } from './dto/request-venueoperator.dto';
import { UpdateVenueoperatorDto } from './dto/response-venueoperator.dto';

@Controller('venueoperator')
export class VenueoperatorController {
  constructor(private readonly venueoperatorService: VenueoperatorService) {}

  @Post()
  create(@Body() createVenueoperatorDto: CreateVenueoperatorDto) {
    return this.venueoperatorService.create(createVenueoperatorDto);
  }

  @Get()
  findAll() {
    return this.venueoperatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueoperatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueoperatorDto: UpdateVenueoperatorDto) {
    return this.venueoperatorService.update(+id, updateVenueoperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueoperatorService.remove(+id);
  }
}
