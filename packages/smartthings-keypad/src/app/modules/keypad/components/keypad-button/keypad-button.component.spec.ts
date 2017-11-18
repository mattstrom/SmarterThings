import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadButtonComponent } from './keypad-button.component';

describe('KeypadButtonComponent', () => {
  let component: KeypadButtonComponent;
  let fixture: ComponentFixture<KeypadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
