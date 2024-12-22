import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {equalPlanets, Planet} from '../model/planet';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '../helper/array.helper';

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
    if (isEqual(this.planets(), planets))
      return;

    patchState(this, {
      planets: mergeArrays(this.planets(), planets, equalPlanets)
    });
  }
}
