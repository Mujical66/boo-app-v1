import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UndeleteEventoPage } from './undelete-evento.page';

describe('UndeleteEventoPage', () => {
  let component: UndeleteEventoPage;
  let fixture: ComponentFixture<UndeleteEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeleteEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
