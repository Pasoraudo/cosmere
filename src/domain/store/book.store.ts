import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Book} from '../model/book';
import {signalStore, withState} from '@ngrx/signals';

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
    if (isEqual(this.get().books, books))
      return;

    this.patchState(state => ({
      books: mergeArrays(state.books, books)
    }));
  }
}
