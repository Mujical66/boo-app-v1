import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCrudEventoPage } from './list-crud-evento.page';

describe('ListCrudEventoPage', () => {
  let component: ListCrudEventoPage;
  let fixture: ComponentFixture<ListCrudEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCrudEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
