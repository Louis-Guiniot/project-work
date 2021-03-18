import { TestBed } from '@angular/core/testing';

import { MieiTorneiService } from './miei-tornei.service';

describe('MieiTorneiService', () => {
  let service: MieiTorneiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MieiTorneiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
