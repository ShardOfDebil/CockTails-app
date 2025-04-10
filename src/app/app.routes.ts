import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cocktails',
    pathMatch: 'full',
  },
  {
    path: 'cocktails',
    loadComponent: () => import('./cocktails/cocktails.page').then( m => m.CocktailsPage)
  },
  {
    path: 'cocktail-details',
    loadComponent: () => import('./cocktail-details/cocktail-details.page').then( m => m.CocktailDetailsPage)
  },
  {
    path: 'random-cocktail',
    loadComponent: () => import('./modals/random-cocktail/random-cocktail.page').then( m => m.RandomCocktailPage)
  },
];
