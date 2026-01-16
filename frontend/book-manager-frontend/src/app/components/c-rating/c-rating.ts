import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-c-rating',
  imports: [],
  templateUrl: './c-rating.html',
  styleUrl: './c-rating.scss',
})
export class CRating implements OnInit {
  label = input<string>();
  stars = input<number>(5);
  rateValue = input<number>(0);
  readonly = input<boolean>(false);

  cleanable = input<boolean>(false);
  onSelect = output<number>();

  rating = signal(0);
  starsArray = Array(this.stars()).fill(0);

  ngOnInit(): void {
    this.starsArray = Array(this.stars()).fill(0);
    this.rating.set(this.rateValue());
  }

  onSelectStar(index: number) {
    if(this.readonly()) {
      return;
    }

    const newVal = index + 1;
    this.rating.set(newVal);
    this.onSelect.emit(newVal);
  }

  onClearRating() {
    this.rating.set(0);
    this.onSelect.emit(0);
  }

}
