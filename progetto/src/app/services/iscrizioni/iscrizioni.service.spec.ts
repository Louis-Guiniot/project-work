import { TestBed } from '@angular/core/testing';

import { IscrizioniService } from './iscrizioni.service';

describe('IscrizioniService', () => {
  let service: IscrizioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IscrizioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
