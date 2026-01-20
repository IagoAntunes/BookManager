import { Component, inject, input, OnInit, output } from '@angular/core';
import { CModal } from "../c-modal/c-modal";
import { CField } from "../c-field/c-field";
import { CRating } from "../c-rating/c-rating";
import { CButton } from "../c-button/c-button";
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddBookRequestDto } from '../../core/models/book/add-book-request.dto';
import { BookModel } from '../../core/models/book/book.model';

@Component({
  selector: 'app-c-add-updated-book',
  imports: [CModal, CField, CRating, CButton, ReactiveFormsModule],
  templateUrl: './c-add-updated-book.html',
  styleUrl: './c-add-updated-book.scss',
})
export class CAddUpdatedBook implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  isLoading = input<boolean>(false);

  isUpdateMode = input<boolean>(false);
  bookToUpdate = input<BookModel | null>(null);

  closeModal = output<void>();
  addUpdateBook = output<AddBookRequestDto>();

  ngOnInit(): void {
    const book = this.bookToUpdate();

    if (this.isUpdateMode() && book) {
      this.addBookForm.patchValue(book);
    }
  }

  addBookForm = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    review: ['', [Validators.required]],
  });

  onCloseModal() {
    this.closeModal.emit();
  }

  onSelectRating(rating: number) {
    this.addBookForm.patchValue({ rating });
  }

  onAddUpdateBook() {
    if (this.addBookForm.valid) {
      const request: AddBookRequestDto = this.addBookForm.getRawValue();
      this.addUpdateBook.emit(request);
    }
  }

}
