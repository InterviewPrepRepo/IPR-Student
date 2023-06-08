import { TestBed } from '@angular/core/testing';

import { ImochaService } from './imocha.service';

describe('ImochaService', () => {
  let service: ImochaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImochaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
