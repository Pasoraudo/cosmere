import {Injectable} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {Observable} from 'rxjs';
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

  syncAllPlanets(): Planet[] {
    return this.store.syncState().planets;
  }

  allPlanets(): Observable<Planet[]> {
    return this.store.planets$;
  }
}
