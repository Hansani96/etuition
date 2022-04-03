import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClzComponent } from './edit-clz.component';

describe('EditClzComponent', () => {
  let component: EditClzComponent;
  let fixture: ComponentFixture<EditClzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
