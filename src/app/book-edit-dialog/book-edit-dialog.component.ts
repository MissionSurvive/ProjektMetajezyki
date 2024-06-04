import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book-model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.scss']
})
export class BookEditDialogComponent {
  bookForm: FormGroup;
  base64Image:any = '';

  constructor(private _fb: FormBuilder, private datePipe: DatePipe, private _bookService: BookService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<BookEditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public book: Book) {
    this.bookForm = this._fb.group({
      title: '',
      author: '',
      publisher: '',
      image: [''],
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
      pages: [this.book.pages, Validators.required],
      description: [this.book.description, Validators.required],
      status: [this.book.status, Validators.required],
      readpages: [this.book.readpages, Validators.required],
      rating: [this.book.rating, Validators.required],
    });
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
      this.openSnackBar('Dodaj brakujące zdjęcie okładki', 3000);
      return;
    }

      if (readpages > pages) {
        this.bookForm.get('readpages')?.setErrors({ invalidReadPages: true });
      } else {
        this._bookService.editBook(this.book.id!, updatedBook).subscribe(
          () => {
            this.openSnackBar('Książka została edytowana', 1000);
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
