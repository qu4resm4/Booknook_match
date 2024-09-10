import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteressesPage } from './interesses.page';

describe('InteressesPage', () => {
  let component: InteressesPage;
  let fixture: ComponentFixture<InteressesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InteressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
