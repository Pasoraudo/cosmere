import {Injectable} from '@angular/core';
import {Drivers, Storage} from '@ionic/storage';
import {isString} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class Localstorage {

  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      name: '__cosmere__',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });

    this.storage.create().then(() => console.log('DB ready'));
  }

  async set(key: string, value: string): Promise<void> {
    await this.storage.set(key, value);
  }

  async setAny(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.storage.get(key);
  }

  async getObj<T>(key: string): Promise<T | null> {
    try {
      const json = await this.storage.get(key);

      return JSON.parse(json) as T;

    } catch (e) {
      return null;
    }
  }

  async getany<T>(key: string): Promise<T | null> {
    try {
      const object = await this.storage.get(key);

      if (isString(object))
        return JSON.parse(object) as T;

      return object;

    } catch (e) {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    return this.storage.remove(key);
  }

  syncSet(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  syncGet(key: string): string | null {
    return localStorage.getItem(key);
  }

  syncGetObj<T>(key: string): T | null {
    try {

      const json = localStorage.getItem(key);

      return JSON.parse(json) as T;

    } catch (e) {
      return null;
    }
  }

  syncRemove(key: string): void {
    localStorage.removeItem(key);
  }
}
