import {Injectable} from '@angular/core';
import {Auth} from '@model/auth';
import {patchState, signalStore, withState} from '@ngrx/signals';

export interface AuthState {
  me: Auth | null;
}

const emptyState = (): AuthState => ({
  me: null
});

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends signalStore(
  {protectedState: false},
  withState<AuthState>(emptyState()),
) {

  saveMe(auth: Auth): void {
    patchState(this, {
      me: auth
    });
  }
}
