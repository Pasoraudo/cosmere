import {Injectable} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {Observable} from 'rxjs';
import {PlanetStore} from '../../store/planet.store';
import {Planet} from '../../model/planet';
import {Guide} from '../../model/guide';
import {GuideStore} from '../../store/guide.store';

@Injectable({
  providedIn: 'root',
})
export class GuideApi {

  constructor(private readonly api: ApiClient, private readonly store: GuideStore) {
  }

  async fetchAllGuides(): Promise<void> {
    const httpGuides = await this.api.get('guides') as Guide[];
    this.store.saveAllGuides(httpGuides);
  }

  syncAllGuides(): Guide[] {
    return this.store.syncState().guides;
  }

  allGuides(): Observable<Guide[]> {
    return this.store.guides$;
  }
}
