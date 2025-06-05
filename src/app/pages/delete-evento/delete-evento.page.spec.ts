import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteEventoPage } from './delete-evento.page';

describe('DeleteEventoPage', () => {
  let component: DeleteEventoPage;
  let fixture: ComponentFixture<DeleteEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
