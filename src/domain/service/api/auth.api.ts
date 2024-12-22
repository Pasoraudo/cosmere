import {Injectable, Signal} from '@angular/core';
import {AuthStore} from '../../store/auth.store';
import {Auth} from '../../model/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {

  constructor(private readonly store: AuthStore) {
  }

  me(): Signal<Auth> {
    return this.store.me;
  }

  saveMe(me: Auth): void {
    return this.store.saveMe(me);
  }
}
