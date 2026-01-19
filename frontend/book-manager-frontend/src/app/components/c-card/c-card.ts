import { Component, input, output } from '@angular/core';
import { BadgeTheme, CBadge } from "../c-badge/c-badge";
import { CRating } from "../c-rating/c-rating";
import { CButton } from "../c-button/c-button";
import { BookModel } from '../../core/models/book/book.model';

@Component({
  selector: 'app-c-card',
  imports: [CBadge, CRating, CButton],
  templateUrl: './c-card.html',
  styleUrl: './c-card.scss',
})
export class CCard {
  book = input<BookModel>();

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


  convertStatus(status:string) : BadgeTheme{
    switch (status) {
      case 'Quero Ler': {
        return 'default';
      }
      case 'Lendo': {
        return 'inProgress';
      }
      case 'Lido': {
        return 'done';
      }
      default: {
        return 'default';
      }
    }
  }

}
