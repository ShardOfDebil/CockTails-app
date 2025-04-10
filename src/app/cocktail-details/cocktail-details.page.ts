import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.page.html',
  styleUrls: ['./cocktail-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CocktailDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
