import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book-model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-add-dialog',
  templateUrl: './book-add-dialog.component.html',
  styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent {
  bookForm: FormGroup;
  base64Image:any = '';

  constructor(private _fb: FormBuilder, private datePipe: DatePipe, private _bookService: BookService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<BookAddDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public book: Book) {
    this.bookForm = this._fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      image: ['', Validators.required],
      releasedate: ['', Validators.required],
      pages: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      readpages: ['', Validators.required],
      rating: ['', Validators.required],
    })
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, '', {
      duration: duration,
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

  hasError(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
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
      this.openSnackBar('Dodaj brakujące zdjęcie okładki', 3000);
      return;
    }

      const formData = {
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        publisher: this.bookForm.get('publisher')?.value,
        image: this.bookForm.get('image')?.value,
        releaseDateValue: this.bookForm.get('releasedate')?.value,
        pages: this.bookForm.get('pages')?.value,
        description: this.bookForm.get('description')?.value,
        status: this.bookForm.get('status')?.value,
        readpages: this.bookForm.get('readpages')?.value,
        rating: this.bookForm.get('rating')?.value,
      };

      if (readpages > pages) {
        this.bookForm.get('readpages')?.setErrors({ invalidReadPages: true });
      } else {
        console.log(formData);
        this._bookService.addBook(this.bookForm.value).subscribe({
        next: (val: any) => {
          this.openSnackBar('Książka została dodana', 1000);
          this.dialogRef.close(formData);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
      } 
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
