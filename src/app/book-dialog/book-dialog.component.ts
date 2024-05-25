import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent {
  bookForm: FormGroup;
  base64Image:any = '';

  constructor(private _fb: FormBuilder, private datePipe: DatePipe, private _bookService: BookService, private _dialogRef: DialogRef<BookDialogComponent>) {
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
      const releaseDateValue = this.bookForm.get('releasedate')?.value;
      const formattedReleaseDate = this.datePipe.transform(releaseDateValue, 'dd-MM-yyyy');

      const formData = {
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        publisher: this.bookForm.get('publisher')?.value,
        image: this.bookForm.get('image')?.value,
        releaseDate: formattedReleaseDate,
        pages: this.bookForm.get('pages')?.value,
        description: this.bookForm.get('description')?.value,
        status: this.bookForm.get('status')?.value,
        readpages: this.bookForm.get('readpages')?.value,
        rating: this.bookForm.get('rating')?.value,
      };
  
      console.log(formData);
      // Send the form data to the server or perform other actions
      this._bookService.addBook(this.bookForm.value).subscribe({
        next: (val: any) => {
          alert('Book added');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

  onCancel() {

  }

}
