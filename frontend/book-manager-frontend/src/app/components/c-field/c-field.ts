import { Component, input, forwardRef, signal, Self, Optional, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './c-field.html',
  styleUrl: './c-field.scss',
})
export class CField implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(1);
  change = output<string>();

  value = signal<string>('');

  onChange: any = () => { 
    this.change.emit(this.value())
  };
  onTouched: any = () => { };

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  get hasError(): boolean {
    return !!(
      this.controlDir &&
      this.controlDir.invalid &&
      this.controlDir.touched
    );
  }

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void { this.value.set(val); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}