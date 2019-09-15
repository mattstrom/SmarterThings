import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassedBadgeComponent } from './bypassed-badge.component';

describe('BypassedBadgeComponent', () => {
  let component: BypassedBadgeComponent;
  let fixture: ComponentFixture<BypassedBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassedBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassedBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
