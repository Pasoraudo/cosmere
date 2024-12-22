import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Guide} from '../model/guide';
import {signalStore, withState} from '@ngrx/signals';

export interface GuideState {
  guides: Guide[];
}

const emptyState = (): GuideState => ({
  guides: []
});

@Injectable({
  providedIn: 'root',
})
export class GuideStore extends signalStore(
  {protectedState: false},
  withState<GuideState>(emptyState()),
) {

  saveAllGuides(planets: Guide[]): void {
    if (isEqual(this.get().guides, planets))
      return;

    this.patchState(state => ({
      guides: mergeArrays(state.guides, planets)
    }));
  }
}
