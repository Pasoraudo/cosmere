import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {equalGuides, Guide} from '@model/guide';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '@helper/array.helper';

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
    const guides = this.guides();
    if (isEqual(guides, planets))
      return;

    patchState(this, {
      guides: mergeArrays(guides, planets, equalGuides),
    });
  }
}
