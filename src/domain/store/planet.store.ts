import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {byId} from '../function/search.helper';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Planet} from '../model/planet';

export interface PlanetState {
  planets: Planet[];
}

const emptyState = (): PlanetState => ({
  planets: []
});

@Injectable({
  providedIn: 'root',
})
export class PlanetStore extends ComponentStore<PlanetState> {

  public readonly planets$ = this.select(state => state.planets);

  constructor() {
    super(emptyState());
  }

  saveAllPlanets(planets: Planet[]): void {
    if (isEqual(this.get().planets, planets))
      return;

    this.patchState(state => ({
      planets: mergeArrays(state.planets, planets)
    }));
  }

  syncState(): PlanetState {
    return this.get();
  }

  syncPlanet(planetId: string): Planet | null {
    return byId(planetId, this.get().planets);
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
