import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CButton } from "./components/c-button/c-button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-manager-frontend');

  teste(){
    console.log('clicou no botão');
  }

}
