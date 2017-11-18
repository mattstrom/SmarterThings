import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumpadComponent } from './keypad.component';

describe('KeypadComponent', () => {
  let component: NumpadComponent;
  let fixture: ComponentFixture<NumpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
