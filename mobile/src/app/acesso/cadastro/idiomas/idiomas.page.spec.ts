import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdiomasPage } from './idiomas.page';

describe('IdiomasPage', () => {
  let component: IdiomasPage;
  let fixture: ComponentFixture<IdiomasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
