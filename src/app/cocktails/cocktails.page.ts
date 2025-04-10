import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, shuffle } from 'ionicons/icons';
import { CocktailService } from '../services/cocktail.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Cocktail } from '../models/cocktail.model';
import { RandomCocktailPage } from '../modals/random-cocktail/random-cocktail.page';

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
  private readonly router = inject(Router);
  private readonly modalCtrl = inject(ModalController);
  public readonly cocktails = this.cocktailService.cocktails;

  constructor() {
    addIcons({ search, shuffle });
    this.loadCocktails();
  }

  public loadCocktails(): void {
    this.cocktails.set([]);
  }

  public onSearchInput(event: any): void {
    const query = event.target.value;
    if (!query || query.trim() === '') {
      if (event.detail.inputType !== 'deleteContentBackward' && event.detail.inputType !== 'deleteContentForward') {
        this.loadCocktails();
      }
    }
  }

  public onSearch(query: string): void {
    if (query && query.length > 0) {
      this.cocktailService.searchCocktails(query)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(cocktails => this.cocktails.set(cocktails));
    } else {
      this.loadCocktails();
    }
  }

  public async onRandomCocktail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RandomCocktailPage,
      breakpoints: [0, 0.95],
      initialBreakpoint: 0.95,
      cssClass: 'random-cocktail-modal'
    });
    await modal.present();
  }

  public onCocktailClick(cocktail: Cocktail): void {
    this.router.navigate(['/cocktail-details', cocktail.idDrink]);
  }
}
