import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPadComponent } from './control-pad.component';

describe('ControlPadComponent', () => {
  let component: ControlPadComponent;
  let fixture: ComponentFixture<ControlPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
