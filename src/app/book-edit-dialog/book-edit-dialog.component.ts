import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.scss']
})
export class BookEditDialogComponent {
  bookForm: FormGroup;
  base64Image:any = '';

  constructor(private _fb: FormBuilder, private datePipe: DatePipe, private _bookService: BookService, public dialogRef: MatDialogRef<BookEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public book: Book) {
    this.bookForm = this._fb.group({
      title: '',
      author: '',
      publisher: '',
      image: [''],
      releasedate: '',
      pages: '',
      description: '',
      status: '',
      readpages: '',
      rating: ''
    })
  }

  ngOnInit() {
    this.bookForm = this._fb.group({
      title: [this.book.title],
      author: [this.book.author],
      publisher: [this.book.publisher],
      image: [this.book.image],
      releasedate: [this.book.releaseDate],
      pages: [this.book.pages],
      description: [this.book.description],
      status: [this.book.status],
      readpages: [this.book.readpages],
      rating: [this.book.rating],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
    this.base64Image = reader.result as string;
    this.bookForm.get('image')?.setValue(this.base64Image);
    }

    reader.readAsDataURL(file);
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      const updatedBook = this.bookForm.value;
      this._bookService.editBook(this.book.id!, updatedBook).subscribe(
        () => {
          console.log('Book updated successfully');
          this.dialogRef.close(updatedBook);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
