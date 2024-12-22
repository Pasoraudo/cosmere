import {Injectable, Signal} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {SagaStore} from '../../store/saga.store';
import {Saga} from '../../model/saga';

@Injectable({
  providedIn: 'root',
})
export class SagaApi {

  constructor(private readonly api: ApiClient, private readonly store: SagaStore) {
  }

  async fetchAllSagas(): Promise<void> {
    const httpSagas = await this.api.get('sagas') as Saga[];
    this.store.saveAllSagas(httpSagas);
  }

  allSagas(): Signal<Saga[]> {
    return this.store.sagas;
  }
}
