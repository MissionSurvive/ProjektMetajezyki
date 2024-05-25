import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { BookService } from './services/book.service';
import { Book } from './models/book-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  title = 'book-list';

  constructor(private _dialog: MatDialog, private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

    openDialogForm() {
      this._dialog.open(BookDialogComponent)
    }
}