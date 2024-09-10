import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BemvindoPage } from './bemvindo.page';

describe('BemvindoPage', () => {
  let component: BemvindoPage;
  let fixture: ComponentFixture<BemvindoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BemvindoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
