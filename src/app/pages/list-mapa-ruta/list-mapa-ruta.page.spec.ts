import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMapaRutaPage } from './list-mapa-ruta.page';

describe('ListMapaRutaPage', () => {
  let component: ListMapaRutaPage;
  let fixture: ComponentFixture<ListMapaRutaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMapaRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
