import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarEventoPage } from './registrar-evento.page';

describe('RegistrarEventoPage', () => {
  let component: RegistrarEventoPage;
  let fixture: ComponentFixture<RegistrarEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
