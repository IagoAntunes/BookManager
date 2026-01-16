import { Component, input, Input } from '@angular/core';


@Component({
  selector: 'app-c-field',
  imports: [],
  templateUrl: './c-field.html',
  styleUrl: './c-field.scss',
})
export class CField {
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(1);
}
