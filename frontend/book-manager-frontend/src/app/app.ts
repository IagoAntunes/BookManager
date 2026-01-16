import { Component, signal } from '@angular/core';
import { CButton } from "./components/c-button/c-button";
import { CField } from "./components/c-field/c-field";
import { CRating } from "./components/c-rating/c-rating";
import { CBadge } from "./components/c-badge/c-badge";
import { CCard } from "./components/c-card/c-card";

@Component({
  selector: 'app-root',
  imports: [CButton, CField, CRating, CBadge, CCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-manager-frontend');

  teste(){
    console.log('clicou no botão');
  }

}
