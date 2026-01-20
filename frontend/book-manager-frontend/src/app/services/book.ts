import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddBookRequestDto } from '../core/models/book/add-book-request.dto';

@Injectable({
  providedIn: 'root',
})
export class Book {
  private readonly _http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/Book`;


  getBooks() : Observable<any>{
    return this._http.get<any>(`${this.url}/books`);
  }

  deleteBook(bookId: string) : Observable<any>{
    return this._http.delete<any>(`${this.url}/${bookId}`);
  }

  addBook(request: AddBookRequestDto): Observable<any>{
    return this._http.post<any>(`${this.url}`, request);
  }

  updateBook(bookId: string, request: AddBookRequestDto): Observable<any>{
    return this._http.put<any>(`${this.url}/${bookId}`, request);
  }

}
