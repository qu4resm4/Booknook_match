import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstEscolhaPage } from './inst-escolha.page';

describe('InstEscolhaPage', () => {
  let component: InstEscolhaPage;
  let fixture: ComponentFixture<InstEscolhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstEscolhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
