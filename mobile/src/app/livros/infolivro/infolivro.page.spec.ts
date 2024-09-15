import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfolivroPage } from './infolivro.page';

describe('InfolivroPage', () => {
  let component: InfolivroPage;
  let fixture: ComponentFixture<InfolivroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfolivroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
