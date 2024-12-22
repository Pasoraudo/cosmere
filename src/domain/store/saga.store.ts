import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {equalSagas, Saga} from '@model/saga';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '@helper/array.helper';

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
    if (isEqual(this.sagas(), sagas))
      return;

    patchState(this, {
      sagas: mergeArrays(this.sagas(), sagas, equalSagas)
    });
  }
}
