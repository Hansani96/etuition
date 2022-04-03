import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyClzComponent } from './view-my-clz.component';

describe('ViewMyClzComponent', () => {
  let component: ViewMyClzComponent;
  let fixture: ComponentFixture<ViewMyClzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyClzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyClzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
