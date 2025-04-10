import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailsPage } from './cocktails.page';

describe('CocktailsPage', () => {
  let component: CocktailsPage;
  let fixture: ComponentFixture<CocktailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
