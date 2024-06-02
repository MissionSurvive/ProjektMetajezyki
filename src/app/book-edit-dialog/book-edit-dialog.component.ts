import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book-model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      publisher: [this.book.publisher, Validators.required],
      image: [this.book.image, Validators.required],
      releasedate: [this.book.releaseDate, Validators.required],
      pages: [this.book.pages, Validators.required],
      description: [this.book.description, Validators.required],
      status: [this.book.status, Validators.required],
      readpages: [this.book.readpages, Validators.required],
      rating: [this.book.rating, Validators.required],
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

  asyncPagesValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const pages = control.value;
    const readpages = this.bookForm.get('readpages')?.value;
  
    if (readpages > pages) {
      return of({ invalidReadPages: true });
    }
  
    return of(null);
  };

  hasError(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      const updatedBook = this.bookForm.value;
      const readpages = this.bookForm.get('readpages')?.value;
      const pages = this.bookForm.get('pages')?.value;
      const rating = this.bookForm.get('rating')?.value;
      const image = this.bookForm.get('image')?.value;

    if (readpages < 0) {
      this.bookForm.get('readpages')?.setErrors({ negative: true });
    }

    if (pages < 0) {
      this.bookForm.get('pages')?.setErrors({ negative: true });
    }

    if (rating < 1 || rating > 10) {
      this.bookForm.get('rating')?.setErrors({ outOfRange: true });
    }

    if (!image) {
      alert('Please provide an image for the book.');
      return;
    }

      if (readpages > pages) {
        this.bookForm.get('readpages')?.setErrors({ invalidReadPages: true });
      } else {
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
  }

  onCancel() {
    this.dialogRef.close();
  }

}
