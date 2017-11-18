import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadContainerComponent } from './keypad-container.component';

describe('KeypadContainerComponent', () => {
  let component: KeypadContainerComponent;
  let fixture: ComponentFixture<KeypadContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypadContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
