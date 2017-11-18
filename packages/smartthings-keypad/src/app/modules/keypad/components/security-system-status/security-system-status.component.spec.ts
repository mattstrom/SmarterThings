import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySystemStatusComponent } from './security-system-status.component';

describe('SecuritySystemStatusComponent', () => {
  let component: SecuritySystemStatusComponent;
  let fixture: ComponentFixture<SecuritySystemStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritySystemStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritySystemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
