import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export type ButtonTheme = 'primary' | 'secondary' | 'danger';


@Component({
  selector: 'app-c-button',
  imports: [CommonModule],
  templateUrl: './c-button.html',
  styleUrl: './c-button.scss',
})
export class CButton {
  theme = input<ButtonTheme>('primary');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  icon = input<string | undefined>();

  clicked = output<void>();
  handleClick(){
    if(!this.disabled()){
      this.clicked.emit();
    }
  }

}
