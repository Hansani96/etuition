import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClzsComponent } from './view-clzs.component';

describe('ViewClzsComponent', () => {
  let component: ViewClzsComponent;
  let fixture: ComponentFixture<ViewClzsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClzsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClzsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
