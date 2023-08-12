import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthStore} from '../../store/auth.store';
import {Auth, UpdateLanguage} from '../../model/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {


  constructor(private readonly store: AuthStore) {
  }


  me(): Observable<Auth> {
    return this.store.me();
  }

  saveMe(me: Auth): void {
    return this.store.saveMe(me);
  }

  updateLanguage(command: UpdateLanguage): void {
    this.store.saveMe(command)
  }

  syncMe(): Auth {
    return this.store.syncMe();
  }
}
