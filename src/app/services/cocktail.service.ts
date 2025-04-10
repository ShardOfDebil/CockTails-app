import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Cocktail, CocktailResponse } from '../models/cocktail.model';
import { map, catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
  public readonly cocktails = signal<Cocktail[]>([]);

  public searchCocktails(query: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/search.php?s=${query}`).pipe(
      map(response => {
        const drinks = response.drinks || [];
        const searchTerm = query.toLowerCase();
        
        return drinks.sort((a, b) => {
          const aName = a.strDrink.toLowerCase();
          const bName = b.strDrink.toLowerCase();
          
          const aNum = /^\d/.test(a.strDrink) ? 1 : 0;
          const bNum = /^\d/.test(b.strDrink) ? 1 : 0;
          if (aNum !== bNum) return aNum - bNum;
          
          const aStartsWith = aName.startsWith(searchTerm) ? 0 : 1;
          const bStartsWith = bName.startsWith(searchTerm) ? 0 : 1;
          if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith;
          
          return a.strDrink.localeCompare(b.strDrink);
        });
      }),
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public getRandomCocktail() {
    return this.http.get<CocktailResponse>(`${this.API_URL}/random.php`).pipe(
      map(response => response.drinks?.[0] || null),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private extractIngredients(cocktail: Record<string, any>): string[] {
    return Object.keys(cocktail)
      .filter(key => key.startsWith('strIngredient') && cocktail[key])
      .map(key => cocktail[key].trim());
  }

  public getCocktailById(id: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/lookup.php?i=${id}`).pipe(
      map(response => {
        const cocktail = response.drinks?.[0] as Cocktail;
        if (!cocktail) return null;
        
        return {
          ...cocktail,
          ingredients: this.extractIngredients(cocktail)
        };
      }),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
