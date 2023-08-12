import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Auth} from '../model/auth';
import {Observable} from 'rxjs';
import {defer} from 'lodash';
import {Localstorage} from '../service/storage/localstorage';

export const AUTH_NAMESPACE = '__auth__';

export interface AuthState {
  me: Auth;
}

const emptyState = (): AuthState => ({
  me: null
});

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {

  public readonly me$ = this.select(state => state.me);

  constructor(private localStorage: Localstorage) {
    super(emptyState());
    console.log('this.syncMe()',this.syncMe());
  }

  saveMe(auth: Auth): void {
    console.log(auth);
    this.patchState(state => ({
      me: auth
    }));

    this.snapshot();
  }

  me(): Observable<Auth> {
    return this.me$;
  }

  syncMe(): Auth {
    return this.get().me;
  }

  reset(): void {
    this.patchState(emptyState());
    this.snapshot();
  }

  snapshot(): void {
    defer(async () => {
      await this.localStorage.setAny(AUTH_NAMESPACE, this.get());
    });
  }

  restore(state: AuthState): void {
    this.patchState({
      ...state
    });
  }
}
