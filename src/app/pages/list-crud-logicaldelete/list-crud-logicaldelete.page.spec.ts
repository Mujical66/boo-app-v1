import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCrudLogicaldeletePage } from './list-crud-logicaldelete.page';

describe('ListCrudLogicaldeletePage', () => {
  let component: ListCrudLogicaldeletePage;
  let fixture: ComponentFixture<ListCrudLogicaldeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCrudLogicaldeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
