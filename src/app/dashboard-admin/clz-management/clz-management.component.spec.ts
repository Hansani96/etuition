import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClzManagementComponent } from './clz-management.component';

describe('ClzManagementComponent', () => {
  let component: ClzManagementComponent;
  let fixture: ComponentFixture<ClzManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClzManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClzManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
