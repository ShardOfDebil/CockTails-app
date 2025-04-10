import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Cocktail, CocktailResponse } from '../models/cocktail.model';
import { map, catchError, of, shareReplay } from 'rxjs';

interface RawCocktail {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
  public readonly cocktails = signal<Cocktail[]>([]);

  private transformCocktail(raw: RawCocktail): Cocktail {
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = raw[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return {
      idDrink: raw.idDrink,
      strDrink: raw.strDrink,
      strGlass: raw.strGlass,
      strDrinkThumb: raw.strDrinkThumb,
      strInstructions: raw.strInstructions,
      ingredients
    };
  }

  public searchCocktails(query: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/search.php?s=${query}`).pipe(
      map(response => (response.drinks || []).map(drink => this.transformCocktail(drink as unknown as RawCocktail))),
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public getRandomCocktail() {
    return this.http.get<CocktailResponse>(`${this.API_URL}/random.php`).pipe(
      map(response => {
        const drink = response.drinks?.[0];
        return drink ? this.transformCocktail(drink as unknown as RawCocktail) : null;
      }),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public getCocktailsByFirstLetter(letter: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/search.php?f=${letter}`).pipe(
      map(response => (response.drinks || []).map(drink => this.transformCocktail(drink as unknown as RawCocktail))),
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public getCocktailById(id: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/lookup.php?i=${id}`).pipe(
      map(response => {
        const drink = response.drinks?.[0];
        return drink ? this.transformCocktail(drink as unknown as RawCocktail) : null;
      }),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
