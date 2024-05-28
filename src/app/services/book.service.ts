import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; // Replace with your API URL
  constructor(private _http: HttpClient) { }

  addBook(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  getBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(this.apiUrl);
  }

  deleteBook(bookId: any): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this._http.delete(url);
  }
}
