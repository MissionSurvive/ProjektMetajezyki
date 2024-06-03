import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookAddDialogComponent } from './book-add-dialog/book-add-dialog.component';
import { BookService } from './services/book.service';
import { Book } from './models/book-model';
import { BookDetailsDialogComponent } from './book-details-dialog/book-details-dialog.component';
import { BookEditDialogComponent } from './book-edit-dialog/book-edit-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | any;
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

  deleteBook(bookId: number | undefined) {
    if (bookId !== undefined) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          console.log('Book deleted successfully');
          this.getBooks(); // Refresh the book list after deletion
        },
        (error) => console.error(error)
      );
    }
  }

    openDialogForm() {
      this._dialog.open(BookAddDialogComponent);
    }

    openDetailsDialog(book: Book) {
      this._dialog.open(BookDetailsDialogComponent, {
        data: book
      });
   }

   openEditDialog(book: Book) {
    this._dialog.open(BookEditDialogComponent, {
      data: book
    });
  }

}