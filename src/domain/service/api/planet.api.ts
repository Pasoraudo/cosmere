import {Injectable, Signal} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {PlanetStore} from '../../store/planet.store';
import {Planet} from '../../model/planet';

@Injectable({
  providedIn: 'root',
})
export class PlanetApi {

  constructor(private readonly api: ApiClient, private readonly store: PlanetStore) {
  }

  async fetchAllPlanets(): Promise<void> {
    const httpPlanets = await this.api.get('planets') as Planet[];
    this.store.saveAllPlanets(httpPlanets);
  }

  allPlanets(): Signal<Planet[]> {
    return this.store.planets;
  }
}
