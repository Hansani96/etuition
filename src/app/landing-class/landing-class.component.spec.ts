import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingClassComponent } from './landing-class.component';

describe('LandingClassComponent', () => {
  let component: LandingClassComponent;
  let fixture: ComponentFixture<LandingClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
