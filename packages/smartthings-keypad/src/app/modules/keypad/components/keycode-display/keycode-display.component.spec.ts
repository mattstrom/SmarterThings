import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycodeDisplayComponent } from './keycode-display.component';

describe('KeycodeDisplayComponent', () => {
  let component: KeycodeDisplayComponent;
  let fixture: ComponentFixture<KeycodeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeycodeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeycodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
