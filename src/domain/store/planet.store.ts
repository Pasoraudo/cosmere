import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Planet} from '../model/planet';
import {signalStore, withState} from '@ngrx/signals';

export interface PlanetState {
  planets: Planet[];
}

const emptyState = (): PlanetState => ({
  planets: []
});

@Injectable({
  providedIn: 'root',
})
export class PlanetStore extends signalStore(
  {protectedState: false},
  withState<PlanetState>(emptyState()),
) {

  saveAllPlanets(planets: Planet[]): void {
    if (isEqual(this.get().planets, planets))
      return;

    this.patchState(state => ({
      planets: mergeArrays(state.planets, planets)
    }));
  }
}
