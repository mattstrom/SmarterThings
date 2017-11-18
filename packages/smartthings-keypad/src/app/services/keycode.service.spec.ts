import { TestBed, inject } from '@angular/core/testing';

import { KeycodeService } from './keycode.service';

describe('KeycodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeycodeService]
    });
  });

  it('should be created', inject([KeycodeService], (service: KeycodeService) => {
    expect(service).toBeTruthy();
  }));
});
