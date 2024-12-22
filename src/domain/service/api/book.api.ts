import {Injectable, Signal} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {BookStore} from '../../store/book.store';
import {Book} from '../../model/book';

@Injectable({
  providedIn: 'root',
})
export class BookApi {

  constructor(private readonly api: ApiClient, private readonly store: BookStore) {
  }

  async fetchAllBooks(): Promise<void> {
    const httpBooks = await this.api.get('books') as Book[];
    this.store.saveAllBooks(httpBooks);
  }

  allBooks(): Signal<Book[]> {
    return this.store.books;
  }
}
