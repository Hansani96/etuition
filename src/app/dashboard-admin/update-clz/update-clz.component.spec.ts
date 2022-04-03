import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClzComponent } from './update-clz.component';

describe('UpdateClzComponent', () => {
  let component: UpdateClzComponent;
  let fixture: ComponentFixture<UpdateClzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
