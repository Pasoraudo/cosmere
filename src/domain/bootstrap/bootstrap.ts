import {Injectable} from '@angular/core';
import {defaultAuth} from '../model/auth';
import {defer} from 'lodash';
import {Localstorage} from '../service/storage/localstorage';
import {AUTH_NAMESPACE, AuthState, AuthStore} from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class Bootstrap {
  constructor(private authStore: AuthStore, private localStorage: Localstorage) {
  }

  bootstrap(): void {
    console.log('INITIALIZING BOOTSTRAP 🚨🚨🚨')
    defer(async () => {
      await this.initAuth();
    });
  }

  private async initAuth(): Promise<void> {
    if (this.authStore.syncMe())
      return;

    const savedAuth = await this.localStorage.getAny<AuthState>(AUTH_NAMESPACE);
    if (savedAuth)
      this.authStore.restore(savedAuth);
    else
      this.authStore.saveMe(defaultAuth());
  }
}

