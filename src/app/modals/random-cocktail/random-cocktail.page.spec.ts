import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomCocktailPage } from './random-cocktail.page';

describe('RandomCocktailPage', () => {
  let component: RandomCocktailPage;
  let fixture: ComponentFixture<RandomCocktailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCocktailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
