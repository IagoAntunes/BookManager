import { Component, effect, forwardRef, input, OnInit, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-c-rating',
  imports: [],
  templateUrl: './c-rating.html',
  styleUrl: './c-rating.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CRating),
      multi: true
    }
  ]
})
export class CRating implements OnInit, ControlValueAccessor {
  label = input<string>();
  stars = input<number>(5);
  rateValue = input<number>(0);
  readonly = input<boolean>(false);

  cleanable = input<boolean>(false);
  onSelect = output<number>();

  rating = signal(0);
  starsArray: number[] = [];

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.starsArray = Array(this.stars()).fill(0);
    });
    
    effect(() => {
      const val = this.rateValue();
      if (val > 0) {
        this.rating.set(val);
      }
    });
  }

  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.rating.set(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
  }

  onSelectStar(index: number) {
    if(this.readonly()) {
      return;
    }

    const newVal = index + 1;
    this.rating.set(newVal);
    this.onSelect.emit(newVal);
    this.onChange(newVal);
    this.onTouched();
  }

  onClearRating() {
    this.rating.set(0);
    this.onSelect.emit(0);
    this.onChange(0);
    this.onTouched();
  }

}
