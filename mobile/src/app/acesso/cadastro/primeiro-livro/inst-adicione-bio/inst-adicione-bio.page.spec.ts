import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstAdicioneBioPage } from './inst-adicione-bio.page';

describe('InstAdicioneBioPage', () => {
  let component: InstAdicioneBioPage;
  let fixture: ComponentFixture<InstAdicioneBioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstAdicioneBioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
