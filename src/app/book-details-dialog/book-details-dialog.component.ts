import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book
  ) {}
}