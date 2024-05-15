import { Test, TestingModule } from '@nestjs/testing';
import { VenueoperatorController } from './venueoperator.controller';
import { VenueoperatorService } from './venueoperator.service';

describe('VenueoperatorController', () => {
  let controller: VenueoperatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueoperatorController],
      providers: [VenueoperatorService],
    }).compile();

    controller = module.get<VenueoperatorController>(VenueoperatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
