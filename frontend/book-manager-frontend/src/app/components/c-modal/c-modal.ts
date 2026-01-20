import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-c-modal',
  standalone: true,
  templateUrl: './c-modal.html',
  styleUrl: './c-modal.scss'
})
export class CModal {
  title = input<string>('');
  onClose = output<void>();

  close() {
    this.onClose.emit();
  }
}