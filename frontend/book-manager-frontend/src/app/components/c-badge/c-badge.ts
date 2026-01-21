import { Component, computed, input } from '@angular/core';

export type BadgeTheme = 'default' | 'inProgress' | 'done';

@Component({
  selector: 'app-c-badge',
  imports: [],
  templateUrl: './c-badge.html',
  styleUrl: './c-badge.scss',
})
export class CBadge {

  theme = input<BadgeTheme>('default');
  inputLabel = input<string>('');


  label = computed(() => {
    if(this.inputLabel() !== ''){
      return this.inputLabel();
    }
    
    switch(this.theme()){
      case 'default': return 'Quero ler';
      case 'inProgress': return 'Lendo';
      case 'done': return 'Lido';
      default: return 'Quero ler';
    } 
  });
}
