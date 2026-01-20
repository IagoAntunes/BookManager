import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CButton } from "../../components/c-button/c-button";
import { Book } from '../../services/book';
import { CField } from "../../components/c-field/c-field";
import { BookModel } from '../../core/models/book/book.model';
import { CCard } from '../../components/c-card/c-card';
import { ToastrService } from 'ngx-toastr';
import { CModal } from '../../components/c-modal/c-modal';
import { CRating } from "../../components/c-rating/c-rating";

enum BookStatus {
  WantToRead = 'Quero Ler',
  Reading = 'Lendo',
  Read = 'Lido'
}

@Component({
  selector: 'app-home',
  imports: [CButton, CField, CCard, CModal, CRating],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private readonly _bookService = inject(Book);
  private _toastr = inject(ToastrService);

  filterQuery = signal<string>('');
  isAddBookModalOpen = signal(false);

  books = signal<BookModel[]>([]);

  filteredBooks = computed(() => {
    const query = this.filterQuery().toLowerCase().trim();
    const allBooks = this.books();

    if (!query) return allBooks;

    return allBooks.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
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

  openModal() {
    this.isAddBookModalOpen.set(true);
  }

  closeModal() {
    this.isAddBookModalOpen.set(false);
  }

  onChangeFilter(value: string) {
    this.filterQuery.set(value);
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

  onSelectRating(rating: number) {


  }

  addBook(){
    //
  }

  private _getBooks() {
    this._bookService.getBooks().subscribe({
      next: (books) => this.books.set(books),
      error: (_) => this._toastr.error('Erro ao carregar livros')
    });
  }


}
