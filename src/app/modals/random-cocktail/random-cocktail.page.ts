import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-random-cocktail',
  templateUrl: './random-cocktail.page.html',
  styleUrls: ['./random-cocktail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RandomCocktailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
