import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {byId} from '../function/search.helper';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Saga} from '../model/saga';

export interface SagaState {
  sagas: Saga[];
}

const emptyState = (): SagaState => ({
  sagas: []
});

@Injectable({
  providedIn: 'root',
})
export class SagaStore extends ComponentStore<SagaState> {

  public readonly sagas$ = this.select(state => state.sagas);

  constructor() {
    super(emptyState());
  }

  saveAllSagas(sagas: Saga[]): void {
    if (isEqual(this.get().sagas, sagas))
      return;

    this.patchState(state => ({
      sagas: mergeArrays(state.sagas, sagas)
    }));
  }

  syncState(): SagaState {
    return this.get();
  }

  syncSaga(bookId: string): Saga | null {
    return byId(bookId, this.get().sagas);
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
