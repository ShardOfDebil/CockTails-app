import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, shuffle } from 'ionicons/icons';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../models/cocktail.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-random-cocktail',
  templateUrl: './random-cocktail.page.html',
  styleUrls: ['./random-cocktail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonImg, CommonModule, FormsModule
  ]
})
export class RandomCocktailPage implements OnInit {
  private readonly cocktailService = inject(CocktailService);
  private readonly modalCtrl = inject(ModalController);
  private readonly destroyRef = inject(DestroyRef);
  public readonly cocktail = signal<Cocktail | null>(null);

  constructor() {
    addIcons({close,shuffle});
  }

  ngOnInit() {
    this.loadRandomCocktail();
  }

  private loadRandomCocktail(): void {
    this.cocktailService.getRandomCocktail()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cocktail => this.cocktail.set(cocktail));
  }

  public onClose(): void {
    this.modalCtrl.dismiss();
  }

  public onNewRandom(): void {
    this.loadRandomCocktail();
  }
}
