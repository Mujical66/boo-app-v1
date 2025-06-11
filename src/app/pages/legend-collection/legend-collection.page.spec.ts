import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegendCollectionPage } from './legend-collection.page';

describe('LegendCollectionPage', () => {
  let component: LegendCollectionPage;
  let fixture: ComponentFixture<LegendCollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
