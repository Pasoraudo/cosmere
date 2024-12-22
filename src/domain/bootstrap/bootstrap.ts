import {Injectable} from '@angular/core';
import {defaultAuth} from '../model/auth';
import {defer} from 'lodash';
import {AuthStore} from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class Bootstrap {
  constructor(private authStore: AuthStore) {
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

    const savedAuth = await this.authStore.me();
    if (savedAuth)
      this.authStore.restore(savedAuth);
    else
      this.authStore.saveMe(defaultAuth());
  }
}

