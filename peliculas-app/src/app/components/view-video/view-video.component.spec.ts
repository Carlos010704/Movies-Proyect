import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoComponent } from './view-video.component';

describe('ViewVideoComponent', () => {
  let component: ViewVideoComponent;
  let fixture: ComponentFixture<ViewVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVideoComponent]
    });
    fixture = TestBed.createComponent(ViewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
