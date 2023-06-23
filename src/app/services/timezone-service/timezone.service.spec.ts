import { TestBed } from '@angular/core/testing';

import { TimezoneService } from './timezone.service';

describe('TimezoneServiceService', () => {
  let service: TimezoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimezoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
