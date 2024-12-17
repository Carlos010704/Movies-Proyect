import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroSearchComponent } from './genero-search.component';

describe('GeneroSearchComponent', () => {
  let component: GeneroSearchComponent;
  let fixture: ComponentFixture<GeneroSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneroSearchComponent]
    });
    fixture = TestBed.createComponent(GeneroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
