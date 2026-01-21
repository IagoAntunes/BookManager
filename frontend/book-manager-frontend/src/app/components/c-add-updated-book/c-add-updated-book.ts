import { Component, inject, input, OnInit, output } from '@angular/core';
import { CModal } from "../c-modal/c-modal";
import { CField } from "../c-field/c-field";
import { CRating } from "../c-rating/c-rating";
import { CButton } from "../c-button/c-button";
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddBookRequestDto } from '../../core/models/book/add-book-request.dto';
import { BookModel } from '../../core/models/book/book.model';
import { CDropdown, DropdownOption } from "../c-dropdown/c-dropdown";

@Component({
  selector: 'app-c-add-updated-book',
  imports: [CModal, CField, CRating, CButton, ReactiveFormsModule, CDropdown],
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

  statusOptions: DropdownOption[] = [
    { label: 'Quero Ler', value: 'wantToRead' },
    { label: 'Lendo', value: 'reading' },
    { label: 'Lido', value: 'read' }
  ];

  onStatusChange(value: any) {
    var statusId = '';
    if(value == 'read'){
      statusId = 'f8b5fec2-57b1-4f80-b2d9-2e06d6e3c5a8';
    }else if(value == 'reading'){
      statusId = 'a3d7e8b1-4c2f-4b8a-8e0c-5f6b9e7d2a1f';
    }else{
      statusId = 'c9e4a0e1-6d3b-4f7c-9b2a-8e1d7f6b9c4d';
    }
    this.addBookForm.patchValue({ statusId: statusId });
  }

  convertStatusIdToLabel(): (DropdownOption | null) {
    switch (this.bookToUpdate()?.status.id) {
      case 'c9e4a0e1-6d3b-4f7c-9b2a-8e1d7f6b9c4d':
        return this.statusOptions[0];
      case 'a3d7e8b1-4c2f-4b8a-8e0c-5f6b9e7d2a1f':
        return this.statusOptions[1];
      case 'f8b5fec2-57b1-4f80-b2d9-2e06d6e3c5a8':
        return this.statusOptions[2];
      default:
        return null;
    }
  }

  ngOnInit(): void {
    const book = this.bookToUpdate();

    if (this.isUpdateMode() && book) {
      this.addBookForm.patchValue({
        ...book,
        statusId: this.statusOptions.find((option) => option.label === book.status.title)?.value,
      });
      this.onStatusChange(this.addBookForm.value);
    }
  }

  addBookForm = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    statusId: ['', [Validators.required]],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    review: ['', [Validators.required]],
  });

  onCloseModal() {
    this.closeModal.emit();
  }

  onAddUpdateBook() {
    if (this.addBookForm.valid) {
      const request: AddBookRequestDto = this.addBookForm.getRawValue();
      this.addUpdateBook.emit(request);
    }
  }

}
