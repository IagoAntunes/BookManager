import { Component, input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CField),
      multi: true
    }
  ],
  templateUrl: './c-field.html',
  styleUrl: './c-field.scss',
})
export class CField implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(1);

  value = signal<string>('');
  
  onChange: any = () => {};
  onTouched: any = () => {};

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val); 
  }

  writeValue(val: string): void { this.value.set(val); }
  registerOnChange(fn: any): void { this.onChange = fn; } 
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}