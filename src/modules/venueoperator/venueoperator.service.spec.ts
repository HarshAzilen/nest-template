import { Test, TestingModule } from '@nestjs/testing';
import { VenueoperatorService } from './venueoperator.service';

describe('VenueoperatorService', () => {
  let service: VenueoperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueoperatorService],
    }).compile();

    service = module.get<VenueoperatorService>(VenueoperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
