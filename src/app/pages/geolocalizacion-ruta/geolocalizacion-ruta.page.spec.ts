import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocalizacionRutaPage } from './geolocalizacion-ruta.page';

describe('GeolocalizacionRutaPage', () => {
  let component: GeolocalizacionRutaPage;
  let fixture: ComponentFixture<GeolocalizacionRutaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacionRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
