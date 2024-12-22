import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Relationship} from '../model/relationship';
import {signalStore, withState} from '@ngrx/signals';

export interface RelationshipState {
  relationships: Relationship[];
}

const emptyState = (): RelationshipState => ({
  relationships: []
});

@Injectable({
  providedIn: 'root',
})
export class RelationshipStore extends signalStore(
  {protectedState: false},
  withState<RelationshipState>(emptyState()),
) {

  saveAllRelationship(relationships: Relationship[]): void {
    if (isEqual(this.get().relationships, relationships))
      return;
    this.patchState(state => ({
      relationships: mergeArrays(state.relationships, relationships)
    }));
  }
}
