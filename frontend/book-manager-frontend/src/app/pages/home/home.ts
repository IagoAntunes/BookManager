import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CButton } from "../../components/c-button/c-button";
import { Book } from '../../services/book';
import { CField } from "../../components/c-field/c-field";
import { BookModel } from '../../core/models/book/book.model';
import { CCard } from '../../components/c-card/c-card';
import { ToastrService } from 'ngx-toastr';
import { AddBookRequestDto } from '../../core/models/book/add-book-request.dto';
import { CAddUpdatedBook } from "../../components/c-add-updated-book/c-add-updated-book";
import { finalize } from 'rxjs';
import { CDropdown, DropdownOption } from "../../components/c-dropdown/c-dropdown";

enum BookStatus {
  WantToRead = 'Quero Ler',
  Reading = 'Lendo',
  Read = 'Lido'
}

type ModalMode = 'add' | 'update' | null;

@Component({
  selector: 'app-home',
  imports: [CButton, CField, CCard, CAddUpdatedBook, CDropdown],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly _bookService = inject(Book);
  private _toastr = inject(ToastrService);

  filterQuery = signal<string>('');

  modalMode = signal<ModalMode>(null);
  isModalOpen = computed(() => this.modalMode() !== null);

  books = signal<BookModel[]>([]);

  bookToUpdate = signal<BookModel | null>(null);

  isLoadingAddUpdateBook = signal<boolean>(false);

  filterDropdownOptions : DropdownOption[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Quero Ler', value: 'wantToRead' },
    { label: 'Lendo', value: 'reading' },
    { label: 'Lido', value: 'read' }
  ];

  selectedFilterDropdownOption = signal<DropdownOption>({ label: 'Todos', value: 'all' });

  onChangeSelectedFilterDropdownOption(value: string) {
    this.selectedFilterDropdownOption.set(
      this.filterDropdownOptions.find(option => option.value === value) || { label: 'Todos', value: 'all' }
    );

  }

  filteredBooks = computed(() => {
    const query = this.filterQuery().toLowerCase().trim();
    const allBooks = this.books();
    const filterDropdownOption = this.selectedFilterDropdownOption();

    return allBooks.filter(book => {
      const matchesQuery = !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      const matchesStatus = filterDropdownOption.value === 'all' ||
        book.status.title.toLowerCase() === filterDropdownOption.label.toLowerCase();

      return matchesQuery && matchesStatus;
    });
  });

  wantToReadCount = computed(() =>
    this.books().filter(b => b.status.title === BookStatus.WantToRead).length
  );

  readingCount = computed(() =>
    this.books().filter(b => b.status.title === BookStatus.Reading).length
  );

  readCount = computed(() =>
    this.books().filter(b => b.status.title === BookStatus.Read).length
  );

  totalCount = computed(() => this.books().length);

  ngOnInit(): void {
    this._getBooks();
  }

  onChangeFilter(value: string) {
    this.filterQuery.set(value);
  }

  openModal(mode: ModalMode, book: BookModel | null = null) {
    this.bookToUpdate.set(book);
    this.modalMode.set(mode);
  }

  closeModal() {
    this.modalMode.set(null);
    this.bookToUpdate.set(null);
  }


  addUpdateBook(request: AddBookRequestDto) {
    const currentBook = this.bookToUpdate();

    if (this.modalMode() === 'update' && !currentBook) return;

    this.isLoadingAddUpdateBook.set(true);

    const operation$ = this.modalMode() === 'update'
      ? this._bookService.updateBook(currentBook!.id, request)
      : this._bookService.addBook(request);

    operation$.pipe(
      finalize(() => this.isLoadingAddUpdateBook.set(false))
    ).subscribe({
      next: () => {
        const message = this.modalMode() === 'update' ? 'atualizado' : 'adicionado';
        this._toastr.success(`Livro ${message} com sucesso!`, 'Sucesso!');
        this.closeModal();
        this._getBooks();
      },
      error: (err) => {
        console.error(err);
        this._toastr.error('Erro ao processar a requisição.', 'Erro');
      }
    });
  }

  deleteBook(bookId: string) {
    this._bookService.deleteBook(bookId).subscribe({
      next: (_) => {
        this._toastr.success('Livro deletado com sucesso!', 'Sucesso!');
        this._getBooks();
      },
      error: (_) => {
        this._toastr.error('Erro ao deletar o livro.', 'Erro');
      }
    })
  }

  private _getBooks() {
    this._bookService.getBooks().subscribe({
      next: (books) => this.books.set(books),
      error: (_) => this._toastr.error('Erro ao carregar livros')
    });
  }

}
