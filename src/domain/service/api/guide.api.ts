import {Injectable, Signal} from '@angular/core';
import {ApiClient} from '../network/api.client';
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

  allGuides(): Signal<Guide[]> {
    return this.store.guides;
  }
}
