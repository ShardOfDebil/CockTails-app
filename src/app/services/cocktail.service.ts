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
      map(response => response.drinks || []),
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

  public getCocktailById(id: string) {
    return this.http.get<CocktailResponse>(`${this.API_URL}/lookup.php?i=${id}`).pipe(
      map(response => response.drinks?.[0] || null),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
