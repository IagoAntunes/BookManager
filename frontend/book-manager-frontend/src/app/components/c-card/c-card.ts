import { Component, input, output } from '@angular/core';
import { CBadge } from "../c-badge/c-badge";
import { CRating } from "../c-rating/c-rating";
import { CButton } from "../c-button/c-button";

@Component({
  selector: 'app-c-card',
  imports: [CBadge, CRating, CButton],
  templateUrl: './c-card.html',
  styleUrl: './c-card.scss',
})
export class CCard {
  imageUrl = input<string>();
  title = input<string>();
  author = input<string>();
  status = input<string>();
  rating = input<number>();
  comment = input<string>();

  onEdit = output<void>();
  onDelete = output<void>();

  onAction(action: 'edit' | 'delete') {
    if (action === 'edit') {
      this.onEdit.emit();
    }
    else if (action === 'delete') {
      this.onDelete.emit();
    }
  }

}
