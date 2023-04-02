import {Injectable, Type} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Dialog {

  constructor(private readonly matDialog: MatDialog) {
  }

  async open(component: Type<any>, options?: any): Promise<void> {
    await this.matDialog.open(component, options);
  }

}
