import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})

export class Toast {
  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'OK', {duration: 2000, verticalPosition: 'top'});
  }

  openFormIncomplete(): void {
    this._snackBar.open('Faltan campos por rellenar', '', {duration: 2000, verticalPosition: 'top'});
  }

}
