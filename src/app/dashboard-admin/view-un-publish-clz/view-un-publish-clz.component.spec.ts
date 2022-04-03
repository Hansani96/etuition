import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnPublishClzComponent } from './view-un-publish-clz.component';

describe('ViewUnPublishClzComponent', () => {
  let component: ViewUnPublishClzComponent;
  let fixture: ComponentFixture<ViewUnPublishClzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnPublishClzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnPublishClzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
