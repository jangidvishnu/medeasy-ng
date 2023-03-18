import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlternativesComponent } from './search-alternatives.component';

describe('SearchAlternativesComponent', () => {
  let component: SearchAlternativesComponent;
  let fixture: ComponentFixture<SearchAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAlternativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
