import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {byId} from '../function/search.helper';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Book} from '../model/book';

export interface BookState {
  books: Book[];
}

const emptyState = (): BookState => ({
  books: []
});

@Injectable({
  providedIn: 'root',
})
export class BookStore extends ComponentStore<BookState> {

  public readonly books$ = this.select(state => state.books);

  constructor() {
    super(emptyState());
  }

  saveAllBooks(books: Book[]): void {
    if (isEqual(this.get().books, books))
      return;

    this.patchState(state => ({
      books: mergeArrays(state.books, books)
    }));
  }

  syncState(): BookState {
    return this.get();
  }

  syncBook(bookId: string): Book | null {
    return byId(bookId, this.get().books);
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
