import { TestBed, async, inject } from '@angular/core/testing';

import { SmartThingsAuthGuard } from './smartthings-auth.guard';

describe('SmartThingsAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartThingsAuthGuard]
    });
  });

  it('should ...', inject([SmartThingsAuthGuard], (guard: SmartThingsAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
