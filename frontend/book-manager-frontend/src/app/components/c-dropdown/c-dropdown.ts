import { Component, HostListener, input, output, signal, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: 'app-c-dropdown',
  standalone: true,
  templateUrl: './c-dropdown.html',
  styleUrl: './c-dropdown.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CDropdown),
      multi: true
    }
  ]
})
export class CDropdown implements ControlValueAccessor, OnInit {

  label = input<string>('');
  placeholder = input<string>('Selecione uma opção');
  options = input<DropdownOption[]>([]);
  valueSelected = input<DropdownOption | null>(null);

  selectedOption = signal<DropdownOption | null>(null);
  isOpen = signal(false);

  valueChange = output<any>();

  onChange: any = () => { };
  onTouched: any = () => { };
  isDisabled = false;

  ngOnInit(): void {
    this.selectedOption.set(this.valueSelected());
  }

  toggle() {
    if (this.isDisabled) return;
    this.isOpen.update(v => !v);
  }

  select(option: DropdownOption) {
    if (this.isDisabled) return;
    this.selectedOption.set(option);
    this.valueChange.emit(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.isOpen.set(false);
  }

  writeValue(value: any): void {
    if (value) {
      const selected = this.options().find(opt => opt.value === value);
      if (selected) {
        this.selectedOption.set(selected);
      }
    } else {
      this.selectedOption.set(null);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-c-dropdown')) {
      this.isOpen.set(false);
    }
  }
}