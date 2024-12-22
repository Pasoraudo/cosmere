import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Saga} from '../model/saga';
import {signalStore, withState} from '@ngrx/signals';

export interface SagaState {
  sagas: Saga[];
}

const emptyState = (): SagaState => ({
  sagas: []
});

@Injectable({
  providedIn: 'root',
})
export class SagaStore extends signalStore(
  {protectedState: false},
  withState<SagaState>(emptyState()),
) {

  saveAllSagas(sagas: Saga[]): void {
    if (isEqual(this.get().sagas, sagas))
      return;

    this.patchState(state => ({
      sagas: mergeArrays(state.sagas, sagas)
    }));
  }
}
