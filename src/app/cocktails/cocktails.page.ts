import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { shuffle } from 'ionicons/icons';
import { CocktailService } from '../services/cocktail.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.page.html',
  styleUrls: ['./cocktails.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonButtons, IonIcon, IonSearchbar, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonImg, CommonModule, FormsModule
  ]
})
export class CocktailsPage {
  private readonly cocktailService = inject(CocktailService);
  private readonly destroyRef = inject(DestroyRef);
  public readonly cocktails = this.cocktailService.cocktails;

  constructor() {
    addIcons({ shuffle });
    this.loadCocktails();
  }

  private loadCocktails(): void {
    this.cocktailService.getCocktailsByFirstLetter('a')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cocktails => this.cocktails.set(cocktails));
  }

  public onSearch(event: any): void {
    const query = event.target.value;
    if (query.length > 2) {
      this.cocktailService.searchCocktails(query)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(cocktails => this.cocktails.set(cocktails));
    }
  }

  public onRandomCocktail(): void {
    this.cocktailService.getRandomCocktail()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cocktail => {
        if (cocktail) {
          this.cocktails.set([cocktail]);
        }
      });
  }
}
