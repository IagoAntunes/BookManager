import { Component, input, OnInit } from '@angular/core';

export type BadgeTheme = 'default' | 'inProgress' | 'done';

@Component({
  selector: 'app-c-badge',
  imports: [],
  templateUrl: './c-badge.html',
  styleUrl: './c-badge.scss',
})
export class CBadge implements OnInit{

  theme = input<BadgeTheme>('default');
  inputLabel = input<string>('');


  label:string = '';

  ngOnInit(): void {
    if(this.inputLabel() === ''){
      switch(this.theme()){
        case 'default': {
          this.label = 'Quero ler';
          break;
        }
        case 'inProgress': {
          this.label = 'Lendo';
          break;
        }
        case 'done': {
          this.label = 'Lido';
          break;
        }
      } 
    }
  }
}
