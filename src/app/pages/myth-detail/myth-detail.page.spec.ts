import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MythDetailPage } from './myth-detail.page';

describe('MythDetailPage', () => {
  let component: MythDetailPage;
  let fixture: ComponentFixture<MythDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MythDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
