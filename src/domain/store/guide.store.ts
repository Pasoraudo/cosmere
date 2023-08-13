import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {byId} from '../function/search.helper';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Planet} from '../model/planet';
import {Guide} from '../model/guide';

export interface GuideState {
  guides: Guide[];
}

const emptyState = (): GuideState => ({
  guides: []
});

@Injectable({
  providedIn: 'root',
})
export class GuideStore extends ComponentStore<GuideState> {

  public readonly guides$ = this.select(state => state.guides);

  constructor() {
    super(emptyState());
  }

  saveAllGuides(planets: Guide[]): void {
    if (isEqual(this.get().guides, planets))
      return;

    this.patchState(state => ({
      guides: mergeArrays(state.guides, planets)
    }));
  }

  syncState(): GuideState {
    return this.get();
  }

  syncGuide(guideId: string): Guide | null {
    return byId(guideId, this.get().guides);
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
