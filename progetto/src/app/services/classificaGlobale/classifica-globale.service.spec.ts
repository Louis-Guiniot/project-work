import { TestBed } from '@angular/core/testing';

import { ClassificaGlobaleService } from './classifica-globale.service';

describe('ClassificaGlobaleService', () => {
  let service: ClassificaGlobaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificaGlobaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
