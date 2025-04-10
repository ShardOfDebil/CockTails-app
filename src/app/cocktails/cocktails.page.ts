import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, shuffle } from 'ionicons/icons';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.page.html',
  styleUrls: ['./cocktails.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar, CommonModule, FormsModule]
})
export class CocktailsPage implements OnInit {

  constructor() {
    addIcons({ search, shuffle });
  }

  ngOnInit() {
  }

}
