import {Injectable} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {Observable} from 'rxjs';
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

  syncAllBooks(): Book[] {
    return this.store.syncState().books;
  }

  allBooks(): Observable<Book[]> {
    return this.store.books$;
  }
}
