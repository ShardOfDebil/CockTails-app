import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { CocktailService } from '../services/cocktail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.page.html',
  styleUrls: ['./cocktail-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonButtons, IonIcon, CommonModule, FormsModule
  ]
})
export class CocktailDetailsPage implements OnInit {
  private readonly cocktailService = inject(CocktailService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  public readonly cocktail = signal<Cocktail | null>(null);

  constructor() {
    addIcons({ arrowBack });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cocktailService.getCocktailById(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(cocktail => this.cocktail.set(cocktail));
    }
  }

  public onBack(): void {
    this.router.navigate(['/cocktails']);
  }

  public getIngredients(): string[] {
    return this.cocktail()?.ingredients || [];
  }
}
