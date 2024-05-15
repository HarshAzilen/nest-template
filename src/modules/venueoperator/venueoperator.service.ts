import { Injectable } from '@nestjs/common';
import { CreateVenueoperatorDto } from './dto/request-venueoperator.dto';
import { UpdateVenueoperatorDto } from './dto/response-venueoperator.dto';
import { CommonService } from 'src/common/common.service';
import { VenueoperatorEntity } from './entities/venueoperator.entity';

@Injectable()
export class VenueoperatorService extends CommonService<VenueoperatorEntity> {
  create(createVenueoperatorDto: CreateVenueoperatorDto) {
    return 'This action adds a new venueoperator';
  }

  findAll() {
    return `This action returns all venueoperator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venueoperator`;
  }

  update(id: number, updateVenueoperatorDto: UpdateVenueoperatorDto) {
    return `This action updates a #${id} venueoperator`;
  }

  remove(id: number) {
    return `This action removes a #${id} venueoperator`;
  }
}
