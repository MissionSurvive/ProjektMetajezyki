import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-list';

  constructor(private _dialog: MatDialog) {}

    openDialogForm() {
      this._dialog.open(BookDialogComponent)
    }
}