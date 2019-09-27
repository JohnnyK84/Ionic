import { TestBed } from '@angular/core/testing';

import { BtleServiceService } from './btle-service.service';

describe('BtleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BtleServiceService = TestBed.get(BtleServiceService);
    expect(service).toBeTruthy();
  });
});
