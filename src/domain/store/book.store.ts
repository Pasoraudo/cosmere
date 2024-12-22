import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {Book, equalBooks} from '@model/book';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '@helper/array.helper';

export interface BookState {
  books: Book[];
}

const emptyState = (): BookState => ({
  books: []
});

@Injectable({
  providedIn: 'root',
})
export class BookStore extends signalStore(
  {protectedState: false},
  withState<BookState>(emptyState()),
) {

  saveAllBooks(books: Book[]): void {
    const actualBooks = this.books();
    if (isEqual(actualBooks, books))
      return;

    patchState(this, {
      books: mergeArrays(actualBooks, books, equalBooks)
    });
  }
}
