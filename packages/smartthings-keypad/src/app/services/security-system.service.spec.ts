import { TestBed, inject } from '@angular/core/testing';

import { SecuritySystemService } from './security-system.service';

describe('SecuritySystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecuritySystemService]
    });
  });

  it('should be created', inject([SecuritySystemService], (service: SecuritySystemService) => {
    expect(service).toBeTruthy();
  }));
});
