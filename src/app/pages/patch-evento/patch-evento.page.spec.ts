import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatchEventoPage } from './patch-evento.page';

describe('PatchEventoPage', () => {
  let component: PatchEventoPage;
  let fixture: ComponentFixture<PatchEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
