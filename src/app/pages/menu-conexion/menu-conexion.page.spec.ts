import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuConexionPage } from './menu-conexion.page';

describe('MenuConexionPage', () => {
  let component: MenuConexionPage;
  let fixture: ComponentFixture<MenuConexionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
